# Etapa 1: compilar la app con Maven y Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom.xml y descargar dependencias primero (cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: imagen final solo con el JAR
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copiar el JAR compilado de la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto donde corre Spring Boot
EXPOSE 8080

# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]