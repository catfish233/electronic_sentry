from sys import argv

 
def calc(text):
	"""based on the input text, return the operation result"""
	try:
		print(text)
		return text + 12
	except Exception as e:
		print(e)
		return 0.0
 
if __name__ == '__main__':
    print(calc(argv[1]))