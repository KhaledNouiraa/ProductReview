the steps to prepare the environement of ProductReview Project :

1. make sure that you have STS (Spring Tools Suite),
if it is not installed, you must install it by downloading it from this link
https://spring.io/tools
2. extract the obtained file 
"spring-tool-suite-4-4.10.0.RELEASE-e4.19.0-win32.win32.x86_64.self-extracting.jar" in the same 
downloaded directory (use the extract command),
3. in the obtained extracted folder, extract the file "contents.zip" in the same folder/directory
(use the extract command) : the obtained folder is entitled "sts-4.10.0.RELEASE" 
4. now, run the application entitled "SpringToolSuite4.exe" for launching 
the Eclipse EDI for Spring project (STS Project) .

** For Back End Projet which implemented by Sprint Boot Framweork  :

5. open STS software and Import the project : From Menu File / Import 
(view the file Image entitled "5_ImportOfExtistedProject.PNG)
6. select the "Maven" next, select "Existing Maven Projects", press "next buton",
7. select folder of the Back-end Of Project (view file image entitled 
"6_SelectBackEndFolderOfProject.PNG", and finish.

8. install mysql DBMS (for example : https://dev.mysql.com/downloads/installer/)
for passord choose (no password)

9. for run the back end project under the server: context menu of the project title /
command Run as / command Run Configuration

10.  double-clic on "Spring boot app" , so a configuration window is opened in the right :
choose the project , and the main type (com.productReview.ProductReviewApplication)
and in the "Environements tab" add two variables :
name = "email"  -- value "your email"
name =password" -- value "your email Password"
in the end, "apply" and "run"

11. in the console window, to verify that application is deloyed, this message must
be showing : "Started ProductReviewApplication in 21.39 seconds (JVM running for 23.237)"

12. to verify that application implents all feautures , we can check all the end points:
 http://localhost:8080/swagger-ui.html#/

13. for email error enable true:
https://support.google.com/accounts/answer/6010255?hl=en#zippy=%2Cuse-more-secure-apps%2Cif-less-secure-app-access-is-off-for-your-account%2Cuse-an-app-password
in the obtained page, select "If "Less secure app access" is on for your account", next, 
in the ligen "Go to the Less secure app access section of your Google Account. ", select
th link : secure app access, a new page is show, you must confirm to access to 
your email, and finally, you accept the parameter for authorized the less secure app for enable.

** For Front End Project which implemented by Angular Framweork 

1. install visual code EDI  (VSCode)
--> to execute same commands for adding nodes modules and compile a front-end project,
	we can doing this with two manners :
2. 
	a. by opening the Front End Project in the "VSCode" by File / Open Folder , in next, 
		select the folder of Front End Project.
	b. create new Terminal in VSCode from Menu Terminal/New Terminal
	c. in this new Terminal execute those commands: "npm install", next, "npm install -g @angular/cli"
		and  "ng serve" (the last command for compiling)
3. 
	a. by opening the Front End Project  forlder Cmd.exe, and  
		select the folder of Front End Project ( xith c:\> cd <folder of Front End Project>)
	b. in this folder, execute those commands: "npm install", next, "npm install -g @angular/cli"
		and  "ng serve" (the last command for compiling)
4. launch the front-end project via navigator : "http://localhost:4200/"
5. test the project.		