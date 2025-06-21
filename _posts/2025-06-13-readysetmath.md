---
title: "Automatic recommendation of preparatory math courses"
categories:
  - Technical 
toc: true
toc_sticky: true
toc_title: "Index"
---

> This is detailed explanation of my first research project as part of my Master's @ Maastricht University. This was a group project, consisting of 6 members, completed in one semester.  

# Problem statement 

Students entering a Master's program often have varied mathematical backgrounds, making it challenging to ensure adequate preparation and course placement. A self-assessment (written test) is currently used to evaluate their skills and guide module placement, along with manual, personalized course recommendations. While helpful, this process is time-consuming.

Our task then is to automate the test and it's correction, and provide personalized recommendations to each student based on these results. Additionally, we need to make a tool that assists the teachers with decision making. 

# Final design


In the end, we decided to make a [Streamlit](https://streamlit.io/) website that generates a unique test per user, provides recommendations on site + to their email. The main components of the project along with my contributions are shown below:

![](/assets/img/rp1/contr.jpg)

A detailed explanation of each of these sections is provided below. 

## Website 

## Question generation 

## Recommendation algorithm

## Student dashboard 

## Output and delivery

## Teacher dashboard 

# Results 


Besides answering our research questions, the results from the survey were very useful in identifying bugs (UI/UX, final output, page navigation, ...) that we missed to catch, and improved the final product significantly. 

# Where do we go from here? 

The application provides a clear and easy-to-follow process—from logging in, selecting topics, answering questions, to receiving personalized feedback and recommendations. Features like dropdown menus, math notation help, instant feedback, and visual summaries make the system easy to use and helpful for students. These design choices reduce
confusion and help students focus on learning. The teacher dashboard provides a quick, no-code option to analyze student performance and helps them use their time more productively.  

While our solution works well, here are the most important directions for future improvement: 

- **Everybody sees the same number of questions:**  There are a total of 22 possible questions on the test. Students that have never studied a topic before, see those many lesser questions. It could be made that more questions are added from topics that the student has studied before. We chose not to do this because: (i) it would be difficult to compare raw scores (ii) limited logic for unique question generation, and didn't want to repeat concepts. 

- **Binary marks only (0/1):** It may be the case that a student has solved most of the problem correctly, and made a mistake in the final step as a silly mistake (concentration error, time pressure error, etc.). It is incorrect to mark this as 0. Partial marks should be awarded, and the recommendation logic needs to be modified to handle partial scores as well. 

- **No hand written inputs:** Students are quired to enter the input as math syntax, and while there are detailed instructions for doing so, this format limits the types of questions we can ask. For example, they cannot draw the graph of a given function, find intersections of two or more functions, etc. Not allowing hand-written input also limits the complexity of the questions that can be asked. Longer questions that involve multiple steps cannot be checked, and neither can proof based questions be asked. A good place to start accepting handwritten input may be the [Mathpix API](https://mathpix.com/docs/convert/overview).

- **Rule based recommendations:** Our current recommendation logic is simple and effective, designed to be interpretable and provide consistent recommendations. Experiments can be conducted where the test results are fed into an Large Language Model (LLM) like ChatGPT and it is asked to provide recommendations. The LLM can search the internet and provided recommendations based on user preference (youtube videos, textbooks, language support, etc.). An LLM may be able to generate a detailed study plan, taking the student's available time as input and making a schedule based on the time required to complete suggested resources. 

- **No order between topics:** Our goal was to recommend the 3 most important topics possible. We define importance as topics that will be required the most in their upcoming courses, things they can learn that will help them score higher in their program. This means our algorithm is biased to the concepts that have more questions on the test. However, this will not always preserve the logical order for learning courses. For example, real functions need to be studied before calculus. 

- **No "Never studied before" option at the question level:** Questions from topics never studied before are not shown on the test, and their answers are forced to be incorrect (0). The recommendation logic also splits topics into "Never studied before" and "Studied before", with each having a separate priority. For these reasons (we would also have to change our underlying data structure a lot), we do not accept "Never studied before" as an option at the individual question level. This is incorrect, I may have studied calculus before, upto differentiation but may have never seen Taylor expansions before. Future versions need to account for this, and modify their data structures and recommendation logic accordingly. 

Thank you for getting this far and reading the entire article :) While this document explains everything thoroughly, I find watching the application in action is a lot more magical and illustrative. A 5 minute demo of our project can be found [here](). 