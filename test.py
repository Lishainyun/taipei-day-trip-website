import re

name = "123"
eamil = "123@gmail.dasdas.d>slacom"
phoneNums = "0979130635"

namePattern = re.compile(r"(\S)")
emailPattern = re.compile(r"([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])")
phoneNumsPattern = re.compile(r"(09\d{8})")

contactNameCheck = re.findall(namePattern, name)
contactEmailCheck = re.fullmatch(emailPattern, eamil)        
phoneNumsCheck = re.fullmatch(phoneNumsPattern, phoneNums)  

if contactNameCheck and contactEmailCheck and phoneNumsCheck:
    print("all checked")
else: 
    print("something went wrong")
