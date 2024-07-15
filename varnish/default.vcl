vcl 4.0;

backend default {
  .host = "jooycar-web";
  .port = "3000";
  .first_byte_timeout = 60s;
}

# Hash se usa como identificador del objeto
# almacenado en cache
sub vcl_hash {
  hash_data(req.url);
  return (lookup);
}

# subrutina llamada antes de cada request al servidor web
sub vcl_backend_fetch {
  unset bereq.http.Cache-Control;
  return (fetch);
}

sub vcl_backend_response {
  set beresp.grace = 15m;
  set beresp.keep = 15m;

  # Compressing content if backends don’t
  if (beresp.http.content-type ~ "text|javascript|xml") {
    set beresp.do_gzip = true;
  }
  return (deliver);
}

sub vcl_recv {
  if (req.method != "GET" && req.method != "HEAD") {
    /* We only deal with GET and HEAD by default */
    return (pass);
  }

  # Varnish no almacena el objeto en cache si hay cookies presentes,
  # por lo que se hace necesario remover estas cookies si no son
  # requeridas por el backend.
  if (req.http.Cookie) {
    # Remove has_js and Google Analytics __* cookies.
    set req.http.Cookie = regsuball(req.http.Cookie, "(^|;\s*)(_[_a-zA-Z0-9]+|has_js)=[^;]*", "");
    # Remove a ";" prefix, if present.
    set req.http.Cookie = regsub(req.http.Cookie, "^;\s*", "");

    if (req.http.Cookie == "") {
      unset req.http.Cookie;
    }
  }
  return (hash);
}
