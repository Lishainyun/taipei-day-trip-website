from datetime import *

date = "2022-04-27"
time = "下半天"
price = 2000

dateCheck = datetime.today().strftime("%Y-%m-%d")
timeCheck = ["上半天","下半天"]
priceCheck = [2000,2500]

if date > dateCheck and time in timeCheck and price in priceCheck:
    print("all checked")
else: 
    print("something went wrong")