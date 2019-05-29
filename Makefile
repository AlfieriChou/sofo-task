############################################
VIEW_DIR := ./build/views

build-app:
	@echo "build ..."
	@npm run tsc
	@echo "tsc done"
	@echo "move views"
	@if test -d ${VIEW_DIR}; \
		then echo "views dir exists" && cp -R ./src/views/* ./build/views; \
		else mkdir ./build/views && cp -R ./src/views/* ./build/views; \
		fi
	@echo "build done"

jaeger:
	@docker run -d --name jaeger \
		-e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
		-p 5775:5775/udp \
		-p 6831:6831/udp \
		-p 6832:6832/udp \
		 -p 5778:5778 \
		 -p 16686:16686 \
		-p 14268:14268 \
		 -p 9411:9411 \
		jaegertracing/all-in-one:1.8
