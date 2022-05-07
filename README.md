# Dockerfiles
There is always an issue with using docker in programming languages like NodeJS. You have to start a container over and over to load the changes you made in files or your server will show old data, you can use `nodemon` to resolve this issue but if you have more than one NodeJS service with lots of code then `nodemon` itself will slow down your system and use a lot of RAM and CPU.

To solve this issue I have finalized an approach, building two containers for every NodeJS app, one container with no live file reloading support and one with live reloading with `nodemon`, it ensures that I only use the watch (live reload) mode when required and such a lifesaver in microservices architectures.

Here are naming conventions I have decided to use, assuming the service is called app then contains will be called as the following
- app_dev (no reload)
- app_watch (live reload)

This way I can start containers manually based on required or write a bash script to start them intelligently.

## How nodemon works
We can use volumes in `Dockerfile` but it is a painful process and it is not recommended, instead, we use `docker-compose.yml` to add volumes. It still creates a problem that we have to build two containers for `-dev` and `-watch` prefix for every NodeJS service (Or similar service) and to do that we will be needing two `docker-compose.yml` files.

## How to use docker-compose
Using docker-compose is straightforward, you can use the following commands:
- `docker-compose up -d --build`, it will always rebuild your containers, It is not required but I prefer it to ensure all my changes are reflected in the containers.
- `docker-compose down` to stop containers and delete them and the network.
- Use volumes to store data that should not be deleted when containers are deleted. I prefer having a hidden `.docker` function in the project folder to store volumes
- Use `docker-compose logs -f` to check logs
- Use `docker-compose logs -f app_watch` to check logs for app_watch service.
- Use `docker-compose exec app_watch bash` to start a bash shell in the app_watch container.

## Helpers
- Reset everything `docker system prune -a`
- Remove not in use cached `docker system prune` A little bit safer to run

## Database helpers
Sometimes we want to run the database in containers but don't want to use a `Dockerfile` or `docker-compose.yml`, here are few tips I used to run a container from CLI

Running MongoDB container for local usage
```bash
docker run --name my-mongo -d mongo
```

Stop mongo container
```bash
docker stop my-mongo
```

Start stopped mongo container after a system restart
```bash
docker start my-mongo
```

If you want to connect to this container from another container then I would suggest using a `docker-compose.yml` file instead.

## TODO
- Add codes on how to build two containers for one service with dev and watch mode.
- Add instructions on how to start containers manually.
- Add a sample bash script to start selected containers in watch mode and everything else in dev mode.
- Add instructions on how to handle migrations in container databases (Using volumes to mount dump folder)