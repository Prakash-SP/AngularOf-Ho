from flask import Flask, request
# from flask_mysqldb import MySQL
app = Flask(__name__)
import pymysql, json, sys, traceback

db = pymysql.connect(host="127.0.0.1",user="root",passwd="dsc",db="TESTDB",port=3306 )
cursor = db.cursor()
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'TESTDB'
# app.config['MYSQL_PORT'] = '3306'
# mysql = MySQL(app)
# cursor = mysql.connection.cursor()



@app.route("/")
def home():
    return "Hello Flask"

@app.route('/chkGetPost', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        try:
            details = request.json
            name = details['Name']
            passwd = details['Pwd']
            PrivLevel = details['plev']
            cursor.execute("INSERT INTO tbl1(name,password,privLevel) VALUES (%s, %s, %s)", (name, passwd, PrivLevel))
            db.close()
            cursor.close()
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
        except:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            if ((str(exc_type.__class__))==KeyError):
                return json.dumps({'success':False,'Message':'Failed to upload data due to missing key : '+ str(exc_value)}), 401, {'ContentType':'application/json'}
            elif ((str(exc_type.__class__))==KeyError):
                return json.dumps({'success':False,'Message':'Failed to upload data due to missing key : '+ str(exc_value)}), 401, {'ContentType':'application/json'}
            else:
                return json.dumps({'success':False}),500, {'ContentType':'application/json'}
    # else
    #     try:

    #     except:

        

    #return render_template('index.html')

# @app.route("/dbdata")
# def dbTest():
#     cursor.execute("select * from tbl1 where userId=1")
#     row_headers=[x[0] for x in cursor.description]              #this will extract row headers
#     db.close()
#     jdata=cursor.fetchall()                                     # Fetch a single row using fetchone() and for all data fetchall() method.
#     cursor.close()
#     json_data=[]
#     for result in jdata:
#         json_data.append(dict(zip(row_headers,result)))
#     return json.dumps(json_data)
