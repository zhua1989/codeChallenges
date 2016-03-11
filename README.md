# Code Challenge

## This is a repository for all my code challenges

### First code challenge

 
Given a CSV file containing office reservation data. Each line represents a reservation of a unique office. There're four columns in each line: Capacity, Monthly Price, Start Day, and End Day. The fourth column "End Day" could be empty, meaning the office is indefinitely reserved starting from the Start Day. 
 
Write a script using the language of your choice that answers the following questions.


1. Given a month and a year, what is the revenue for the given month?
2.  Given a month and a year, what is the total capacity of the unreserved offices for the given month? 
 
When you are complete please send us the link to your script. We'll use the following inputs to test your code. The input will be in this format: YYYY-MM

1. 2000-01  (expected revenue: $0.00, expected total capacity of the unreserved offices: 266)
2. 2018-01 (expected revenue: $77,000.00, expected total capacity of the unreserved offices: 135)
3. 2013-01 
4. 2014-08
 
Notes:


1. Unreserved offices are the offices that are not reserved for a single day for the given month. 
2. If an office is partially reserved for a given month, the revenue should be prorated based on the monthly price. For example: 2, 1500, 2014-05-01, 2014-05-15 counts as $750 in revenue for May because the reservation was for half of the month.
3. For simplicity sake you can include the CSV file as heredoc in your script.
4. After forking the project you'll be able to choose language at the bottom left. 
5. After forking the project and clicking 'ideone it!', a new url will be generated. That is the link you need to send us after you complete the challenge.
 
