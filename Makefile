docker-up:
	docker compose --profile build --profile frontend up -d

docker-down:
	docker compose --profile build --profile frontend down
