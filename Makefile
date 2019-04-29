############################################
ARCHS = 386 arm amd64 arm64
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
