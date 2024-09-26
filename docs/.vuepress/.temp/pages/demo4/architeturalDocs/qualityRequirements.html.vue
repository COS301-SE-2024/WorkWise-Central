<template><div><h1 id="architectural-quality-requirements" tabindex="-1"><a class="header-anchor" href="#architectural-quality-requirements"><span>Architectural quality requirements</span></a></h1>
<p>The quality requirements, in order of priority, that have been identified are as follows:</p>
<h2 id="usability" tabindex="-1"><a class="header-anchor" href="#usability"><span>Usability</span></a></h2>
<p>Usability is an extremely important consideration for our system. From market research done, it is clear that one of the most important things for potential users is that the system is easy an intuitive to use, even if the user is not tech-savvy. It is therefore important that we design our frontend to have high learnability, i.e. it should allow the user to utilise the system proficiently even if they just started working with the system for the first time.</p>
<p>The usability of our frontend is measured by how easily users can interact with it. The users should be able to navigate through the application with ease.</p>
<p>User error rates and task completion time will be measured through usability tests, and  maintain specific thresholds. The tests have been conducted with a variety of the identified user-groups.</p>
<h3 id="quantification" tabindex="-1"><a class="header-anchor" href="#quantification"><span>Quantification</span></a></h3>
<ul>
<li><strong>User Error Rate:</strong> Number of errors made by users during specific tasks.</li>
<li><strong>Task Completion Time:</strong> Time taken by users to complete predefined tasks.</li>
<li><strong>Satisfaction Score</strong>: User satisfaction measured through surveys on a scale of 1-5.</li>
</ul>
<h3 id="target" tabindex="-1"><a class="header-anchor" href="#target"><span>Target</span></a></h3>
<ul>
<li><strong>User Error Rate:</strong> Less than 5% for common tasks.</li>
<li><strong>Task Completion Time:</strong> 90% of users should complete tasks in less than 2 minutes.</li>
<li><strong>Satisfaction Score:</strong> Average satisfaction score of at least 3.5 out of 5.</li>
</ul>
<h2 id="reliability" tabindex="-1"><a class="header-anchor" href="#reliability"><span>Reliability</span></a></h2>
<p>The reliability of the system depends on its ability to prevent and recover from failures. In the event of a user losing internet access, the application must retain its basic functionality, such that the user does not lose their recorded information. Basic functionality includes the ability to write notes and take pictures while completing a job. Additionally, the system must ensure that the inventory tracking remains in a consistent state.</p>
<p>The reliability of the system of the system is primarily measured by <strong>mean time between failures</strong> (MTBF) and <strong>mean time to recovery</strong> (MTTR). The number of critical failures per month will also be used as another metric to quantify the reliability of the system.</p>
<p>Asynchronous messaging between components in the system will allow the system to continue running smoothly under increased loads and handle intermittent failures more effectively.</p>
<h3 id="quantification-1" tabindex="-1"><a class="header-anchor" href="#quantification-1"><span>Quantification</span></a></h3>
<ul>
<li><strong>Mean Time Between Failures (MTBF):</strong> Average time between system failures.</li>
<li><strong>Mean Time to Recovery (MTTR):</strong> Average time to recover from a failure.</li>
<li><strong>Critical Failures per Month:</strong> Number of critical system failures.</li>
</ul>
<h3 id="target-1" tabindex="-1"><a class="header-anchor" href="#target-1"><span>Target</span></a></h3>
<ul>
<li><strong>MTBF:</strong> At least 500 hours.</li>
<li><strong>MTTR:</strong> Less than 2 hours.</li>
<li><strong>Critical Failures per Month:</strong> 0.</li>
</ul>
<h2 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h2>
<p>Security is crucial in our system, due to the application's access to sensitive data related to clients, employees and businesses. The system must prevent and be capable of easily recovering from a data breach. The system must enforce authorisation through a role-based management system to ensure confidentiality of user data.</p>
<p>Security will be quantified through measuring the confidentiality and integrity of the system.</p>
<!-- As such, we plan to implement a Gatekeeper that will serve as a broker between the client requests and the services, to sanitize and validate the requests. -->
<p>Confidentiality will be provided through the use of Authentication and Authorisation in the API Gateway, as well as a role-based system. Each role is associated with a set of permissions, which ensures that crucial endpoints are well-secured. It will be measured by the amount of security measures that are established, and the number of policy violations that occur.</p>
<p>Lastly, the system will provide full transparency on policies regarding user rights and data protection.</p>
<h3 id="quantification-2" tabindex="-1"><a class="header-anchor" href="#quantification-2"><span>Quantification</span></a></h3>
<ul>
<li><strong>Number of Security Breaches:</strong> Incidents of unauthorized access.</li>
<li><strong>Policy Violations:</strong> Number of breaches of security policies.</li>
<li><strong>Security Measures Implemented:</strong> Number of implemented security protocols (e.g., encryption, authentication).</li>
</ul>
<h3 id="target-2" tabindex="-1"><a class="header-anchor" href="#target-2"><span>Target</span></a></h3>
<ul>
<li><strong>Number of Security Breaches:</strong> Zero breaches per year.</li>
<li><strong>Policy Violations:</strong> No more than 1 per year.</li>
<li><strong>Security Measures Implemented:</strong> At least 5 security protocols in place.</li>
</ul>
<h2 id="performance-and-scalability" tabindex="-1"><a class="header-anchor" href="#performance-and-scalability"><span>Performance and Scalability</span></a></h2>
<p>Given that the system will facilitate live communication, system performance is crucial. The system must be responsive and maintain a high throughput with multiple, concurrent requests. The application must have low resource utilisation, to cater for  mobile users on mobile devices.</p>
<!-- The performance of the app will be measured using the following criteria:
  1. **Latency** and **Throughput**: The time taken for a request to be processed and a response to be delivered. Low latency ensures real-time communication. The number of requests the system can handle per unit of time.
  2. **Resource Utilization**: Monitoring CPU, memory, and network usage to ensure efficient resource allocation. Mobile devices have limited resources, so optimizing utilization is critical. -->
<p>In the frontend, we may use server-side rendering (SSR) if performance is found to be suboptimal. Although it would increase the load on the server, the improvement to the user experience may warrant this change.</p>
<p>In the backend, the seamless integration with WebSockets and microservices provided by Nest.js allow a high throughput. The use of asynchronous responses allows the services to run concurrently, and prevents delayed responses.</p>
<h3 id="quantification-3" tabindex="-1"><a class="header-anchor" href="#quantification-3"><span>Quantification</span></a></h3>
<ul>
<li><strong>Latency:</strong> Time taken for a request to be processed and a response delivered.</li>
<li><strong>Throughput:</strong> Number of requests the system can handle per unit of time.</li>
<li><strong>Resource Utilization:</strong> CPU, memory, and network usage.</li>
</ul>
<h3 id="target-3" tabindex="-1"><a class="header-anchor" href="#target-3"><span>Target</span></a></h3>
<ul>
<li><strong>Latency:</strong> Less than 100 milliseconds per request.</li>
<li><strong>Throughput:</strong> At least 1000 requests per second.
Resource Utilization: CPU usage below 75%, memory usage below 70%.</li>
</ul>
<h2 id="maintainability" tabindex="-1"><a class="header-anchor" href="#maintainability"><span>Maintainability</span></a></h2>
<p>The client also identified maintainability as a core requirement. The modular architecture that is present in the API-Gateway allows us to break down the application into smaller, reusable modules. Additionally, the use of services provides a good separation of concerns.</p>
<p>Our coding standards ensure that all code is uniform and readable. The use of the Model-View-Controller (MVC) pattern decouples the business logic from the view, which further makes it more maintainable.</p>
<h3 id="quantification-4" tabindex="-1"><a class="header-anchor" href="#quantification-4"><span>Quantification</span></a></h3>
<ul>
<li><strong>Mean Time to Repair (MTTR):</strong> Average time to fix defects; lower MTTR indicates better maintainability.</li>
<li><strong>Code Coverage:</strong> Percentage of code executed by tests; higher coverage usually leads to fewer undetected bugs.</li>
<li><strong>Code Duplication:</strong> Measures duplicated code; lower duplication indicates better maintainability.</li>
</ul>
<h3 id="target-4" tabindex="-1"><a class="header-anchor" href="#target-4"><span>Target</span></a></h3>
<ul>
<li><strong>Mean Time to Repair (MTTR):</strong> Aim for an MTTR of less than 2 hours, ensuring quick resolution of defects.</li>
<li><strong>Code Coverage:</strong> Achieve at least 80% code coverage through automated tests, ensuring thorough testing and reducing undetected bugs.</li>
<li><strong>Code Duplication:</strong> Maintain code duplication below 5%, promoting code reuse and reducing maintenance overhead.</li>
</ul>
</div></template>


