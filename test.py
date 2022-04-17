from datetime import *

date = "2022-05-07"
time = "下半天"
price = "2000

dateCheck = datetime.today().strftime("%Y-%m-%d")
timeCheck = ["上半天","下半天"]
priceCheck = [2000,2500]

print(date > dateCheck)

if date > dateCheck and time in timeCheck and price in priceCheck:
    print("all checked", dateCheck)
else: 
    print("something went wrong")