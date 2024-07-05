 # Quality Requirements
The quality requirements, in order of priority, that have been identified are as follows:

- Quality Requiremnets
  - [Usability](#usability)
  - [Reliability](#reliability)
  - [Security](#security)
  - [Maintainability](#maintainability)

## Usability 
The usability of our frontend is measured by how easily users can interact with it. The users should be able to easily navigate through the application, with 

Users should be able to quickly track their schedule and open communication channels. Users in managerial positions should have a concise view of relevant information about their subordinates' activities.

User error rates and task completion time will be measured through usability tests, and  maintain specific thresholds. The tests will be conducted with a variety of the identified user-groups.
## Reliability
The reliability of the system depends on its ability to prevent and recover from failures. In the event of a user losing internet access, the application must retain its basic functionality, such that the user does not lose their recorded information. Basic functionality includes the ability to write notes and take pictures while completing a job. Additionally, the system must ensure that the inventory tracking remains in a consistent state. 

The reliability of the system of the system is primarily measured by **mean time between failures** (MTBF) and **mean time to recovery** (MTTR). The number of critical failures per month will also be used as another metric to quantify the reliability of the system.

Asynchronous messaging between components in the system will allow the system to continue running smoothly under increased loads and handle intermittent failures more effectively.
## Security
Security is crucial in our system, due to the application's access to sensitive data related to clients, employees and businesses. The system must prevent and be capable of easily recovering from a data breach. The system must enforce authorisation through a role-based management system to ensure confidentiality of user data. 

Security will be quantified through measuring the confidentiality and integrity of the system. As such, we plan to implement a Gatekeeper that will serve as a broker between the client requests and the services, to sanitize and validate the requests.

Confidentiality will be provided through the use of Authentication and Authorisation in he API Gateway, as well as a role-based system. Each role is associated with a set of permissions, which ensures that crucial endpoints are well-secured. It will be measured by the amount of security measures that are established, and the number of policy violations that occur. 

Lastly, the system will provide full transparency on policies regarding user rights and data protection.
## Performance and Scalability
Given that the system will facilitate live communication, system performance is crucial. The system must be responsive and maintain a high throughput with multiple, concurrent requests. The application must have low resource utilisation, to cater for  mobile users on mobile devices.

The performance of the app will be measured using the following criteria:
  1. **Latency** and **Throughput**: The time taken for a request to be processed and a response to be delivered. Low latency ensures real-time communication. The number of requests the system can handle per unit of time.
  2. **Resource Utilization**: Monitoring CPU, memory, and network usage to ensure efficient resource allocation. Mobile devices have limited resources, so optimizing utilization is critical.
  
In the frontend, we may use server-side rendering (SSR) if performance is found to be suboptimal. Although it would increase the load on the server, the improvement to the user experience may warrant this change.

In the backend, the seamless integration with WebSockets and microservices provided by Nest.js allow a high throughput. The use of asynchronous responses allows the services to run concurrently, and prevents delayed responses.
# Maintainability
The client also identified maintainability as a core requirement. The modular architecture that is present in the API-Gateway allows us to break down the application into smaller, reusable modules. Additionally, the use of services provides a good separation of concerns.

Our coding standards ensure that all code is uniform and readable. The use of the Model-View-Controller (MVC) pattern decouples the business logic from the view, which further makes it more maintainable.
