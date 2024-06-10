from locust import HttpUser, task

class HelloWorldUser(HttpUser):

    host = "http://localhost:3000"
    @task
    def  getWeatherData(self):
        self.client.get("/weather?city=Toronto")