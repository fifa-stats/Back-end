import sys, json, pandas, numpy as np
from sklearn.preprocessing import LabelEncoder

def main():
   parsedLine = json.loads(sys.stdin.readlines()[0])
   result = [{'id': i[  'id'], 'name': i['Name']} for i in parsedLine]
   print(json.dumps(result)) 
   sys.stdout.flush()

#start process
if __name__ == '__main__':
    main()
