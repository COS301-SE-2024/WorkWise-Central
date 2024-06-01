 # Non-Functional Requirements

- Usability
- Reliability
- Security
- Performance and Scalability
- Maintainability
  
## Usability 
- **Description**: The system’s usability depends on how easily users can interact with it.. The system should be clear and easy to understand. The users should be able to easily navigate through the application, with minimal need for guidance external assistance. Users should be able to quickly track their schedule and open communication channels. Users in managerial positions should have a concise view of relevant information about their subordinates' activities.
  
- **Quantification**: User error rates and task completion time will be measured through usability tests, and  maintain specific thresholds. The tests will be conducted with a variety of the identified user-groups.


## Reliability
- **Description**: The reliability of the system depends on its ability to prevent and recover from failures. In the event of a user losing internet access, the application must retain its basic functionality, such that the user does not lose their recorded information. Additionally, the system must ensure that the inventory tracking remains in a consistent state. 
  
- **Quantification**:  The reliability of the system of the system is primarily measured by **mean time between failures** (MTBF) and **mean time to recovery** (MTTR). The number of critical failures per month will also be used as another metric to quantify the reliability of the system.
	- MTBF is measured by the average time between two consecutive failures of a system or component.
	- MTTR is measured by the time taken to restore the system to normal operation after a failure occurs.
	- The number of critical failures per month is measured by the loss of data relating to an assigned job or company. It is further measured by the number errors that prevent users from performing any desired operations. 

## Security
- **Description**: Security is crucial in the system, due to the application's access to sensitive data related to clients and employees. The system must prevent and be capable of easily recovering from a data breach. The system must enforce authorisation through a role-based management system to ensure confidentiality of user data. 
  
- **Quantification**:  Security will be quantified through measuring the confidentiality and integrity of the system.
	- The confidentiality of the system will be quantified by the amount of sensitive data about other users, that a user is authorised to view. It will be measured by the amount of security measures that are established, and the number of  policy violations that occur.
	- The integrity of the system will be measured by the number of established policies regarding user rights.

## Performance and Scalability
- **Description**: Given that the system will facilitate live communication, system performance is crucial. The system must be responsive and maintain a high throughput with multiple, concurrent requests.  The application must have low resource utilisation, to be compatible with mobile devices.  
  
- **Quantification**: The performance of the app will be measured using the following criteria:
  1. **Latency** and **Throughput**: The time taken for a request to be processed and a response to be delivered. Low latency ensures real-time communication. The number of requests the system can handle per unit of time.
  2. **Resource Utilization**: Monitoring CPU, memory, and network usage to ensure efficient resource allocation. Mobile devices have limited resources, so optimizing utilization is critical.

## Maintainability
- **Description**: The maintainability of the system is very important to the client, since they plan on release the system after our development. As such, it must be relatively easy to extend the system or update the system later on. Documentation will also be very important for the system. 
  
- **Quantification**:  Maintainability will be quantified through the degree by which the system can be effectively and efficeintly maintained and evolved over time. Thus code readability, modularity and documentation will be the some of the ways that maintainability will be quantified.
