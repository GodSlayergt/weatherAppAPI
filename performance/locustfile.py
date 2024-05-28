from locust import HttpUser, task

class HelloWorldUser(HttpUser):

    host = "http://localhost:3000"
    @task
    def hello_world(self):
        self.client.get("/")