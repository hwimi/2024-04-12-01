package domain;

public class MemberVO {
/*
create table member(
id varchar(100),
pwd varchar(200) not null,
email varchar(200) not null,
age int default 0,
phone varchar(50),
regdate datetime default now(),
lastlogin datetime default now(),
primary key(id));

 */
private String id;
private String pwd;
private String email;
private int age;
private String phone;
private String regdate;
private String lastlogin;

public MemberVO() {}

//login:id pwd
public MemberVO(String id, String pwd) {
	this.id=id;
	this.pwd=pwd;
}

//회원가입시 필요한 정보 join,modify pwd,email,age,phone
public MemberVO(String id,String pwd ,String email, int age,String phone) {
	//this(id,pwd);
	this.id=id;
	this.pwd=pwd;
	this.email=email;
	this.age=age;
	this.phone=phone;
}
//회원 수정시 필요한 정보

//모든 정보 출력 해야할때 써야하는것
public MemberVO(String id,String pwd,String email,String phone,int age,String regdate,String lastlogin) {
	//this(id,pwd,email,age,phone);
	this.id=id;
	this.pwd=pwd;
	this.email=email;
	this.phone=phone;
	this.age=age;
	this.regdate=regdate;
	this.lastlogin=lastlogin;
}

public String getId() {
	return id;
}

public void setId(String id) {
	this.id = id;
}

public String getPwd() {
	return pwd;
}

public void setPwd(String pwd) {
	this.pwd = pwd;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

public int getAge() {
	return age;
}

public void setAge(int age) {
	this.age = age;
}

public String getRegdate() {
	return regdate;
}

public void setRegdate(String regdate) {
	this.regdate = regdate;
}

public String getLastlogin() {
	return lastlogin;
}

public void setLastlogin(String lastlogin) {
	this.lastlogin = lastlogin;
}

@Override
public String toString() {
	return "MemberVO [id=" + id + ", pwd=" + pwd + ", email=" + email + ", phone=" + phone + ", age=" + age
			+ ", regdate=" + regdate + ", lastlogin=" + lastlogin + "]";
}

}
