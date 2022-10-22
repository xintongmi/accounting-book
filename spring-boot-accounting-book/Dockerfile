FROM gradle:7.5.1-jdk11 as builder
WORKDIR /home/gradle/src/
COPY . /home/gradle/src/
RUN gradle clean
RUN gradle build --stacktrace

FROM openjdk:17-oracle
EXPOSE 8080
RUN microdnf install findutils
COPY --from=builder /home/gradle/src/build/libs/accountingbook-0.0.1-SNAPSHOT.jar /app/
COPY --from=builder /home/gradle/src/build/resources/main/ /app/resources
WORKDIR /app

CMD ["java", "-jar", "accountingbook-0.0.1-SNAPSHOT.jar"]