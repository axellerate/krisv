import os
import webapp2
from string import letters
import hashlib
import random
import hmac
import jinja2
from google.appengine.ext import db
from google.appengine.api import users

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = True)

secret = 'ID,fmkf458FDHhfJIJ9j%^%hY77RRF76gb.2'

def make_secure_val(val):
    return '%s|%s' % (val, hmac.new(secret, val).hexdigest())

def check_secure_val(secure_val):
    val = secure_val.split('|')[0]
    if secure_val == make_secure_val(val):
        return val

def render_str(template, **params):
    t = jinja_env.get_template(template)
    return t.render(params)

# user stuff
def make_salt(length = 5):
    return ''.join(random.choice(letters) for x in xrange(length))

def make_pw_hash(name, pw, salt = None):
    if not salt:
        salt = make_salt()
    h = hashlib.sha256(name + pw + salt).hexdigest()
    return '%s,%s' % (salt, h)

def valid_pw(name, password, h):
    salt = h.split(',')[0]
    return h == make_pw_hash(name, password, salt)

def users_key(group = 'default'):
    return db.Key.from_path('users', group)

class User(db.Model):
    username = db.StringProperty()
    password = db.StringProperty()
    email = db.EmailProperty()
    created = db.DateTimeProperty(auto_now_add= True)

    @classmethod
    def by_id(cls, uid):
        return User.get_by_id(uid, parent = users_key())

    @classmethod
    def by_name(cls, name):
        u = User.all().filter('username =', name).get()
        return u
    
    @classmethod
    def by_email(cls, email):
        e = User.all().filter('email =', email).get()
        return e
	
    @classmethod
    def login(cls, name, pw):
        u = cls.by_name(name)
        if u and valid_pw(name, pw, u.password):
        	return u

    @classmethod
    def register(cls, name, pw, email):
        pw_hash = make_pw_hash(name, pw)
        return User(parent = users_key(),
                    username = name,
                    password = pw_hash,
                    email = email)

class MainHandler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        return render_str(template, **params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

    def set_secure_cookie(self, name, val):
        cookie_val = make_secure_val(val)
        self.response.headers.add_header(
            'Set-Cookie',
            '%s=%s; Path=/' % (name, cookie_val))

    def read_secure_cookie(self, name):
        cookie_val = self.request.cookies.get(name)
        return cookie_val and check_secure_val(cookie_val)

    def login(self, user):
        self.set_secure_cookie('user_id', str(user.key().id()))

    def logout(self):
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        uid = self.read_secure_cookie('user_id')
        self.user = uid and User.by_id(int(uid))


class HomePage(MainHandler):
    def get(self):
    	if self.user:
        	self.render('index.html', username = self.user.username)
        else:
        	self.render('index.html')

    def post(self):
			username = self.request.get('username').lower()
			password = self.request.get('password')

			u = User.login(username, password)
			if u:
				self.login(u)
				self.redirect('/')
			else:
				msg = 'error'
				self.render('index.html', error = msg)


class CreateUser(MainHandler):

	def get(self):
		self.render('create_user.html')

	def post(self):
		username = self.request.get('username').lower()
		password = self.request.get('password')
		email = self.request.get('email')
		u = User.register(username, password, email)
		u.put()

	def done(self, *a, **kw):
		raise NotImplementedError

class Logout(MainHandler):
    def get(self):
        self.logout()
        self.redirect('/')

class Parallax(MainHandler):
    def get(self):
        if self.user:
            self.render('parallax.html', username = self.user.username)
        else:
            self.render('parallax.html')

class Blog(MainHandler):
    def get(self):
        if self.user:
            self.render('blog.html', username = self.user.username)
        else:
            self.render('blog.html')

app = webapp2.WSGIApplication([
	('/', HomePage),
	('/create_user', CreateUser),
	('/logout', Logout),
    ('/parallax', Parallax),
    ('/blog', Blog)
], debug=True)