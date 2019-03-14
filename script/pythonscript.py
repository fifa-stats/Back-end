import sys, json, numpy as np

def main():
    parsedLine = json.loads(sys.stdin.readlines()[0])
    result = [{'id': i['id'], 'name': i['Name']} for i in parsedLine]
    return json.dumps(result)

#start process
if __name__ == '__main__':
    processedData = main()
    print(processedData)
