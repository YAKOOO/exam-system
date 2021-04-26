SET FOREIGN_KEY_CHECKS = 0;

# 学生表
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
	`sno` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) DEFAULT NULL,
	`password` VARCHAR(255) NOT NULL,
	`classId` INT(11) DEFAULT NULL,
	PRIMARY KEY(`sno`)
) ENGINE=INNODB DEFAULT CHARSET = utf8

# 教师表
CREATE TABLE IF NOT EXISTS `teacher`(
	`id` INT PRIMARY KEY NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL
) ENGINE=INNODB DEFAULT CHARSET = utf8


# 试卷基础信息表
CREATE TABLE IF NOT EXISTS `paperInfo`(
	`paperId` INT PRIMARY KEY AUTO_INCREMENT,
	`paperName` VARCHAR(20) NOT NULL,
	`paperExplain` VARCHAR(1000),
	`time` VARCHAR(1000),
	`startTime` VARCHAR(1000),
	`endTime` VARCHAR(1000),
	`score` INT,
	`creator` INT,
	`creatorName` VARCHAR(10),
	FOREIGN KEY (creator) REFERENCES teacher(id) ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET = utf8

# 学生试卷关系表
# 外键联 student表里的 sno update指 外键更改也会更新
CREATE TABLE IF NOT EXISTS `student_papers`(
	`instId` INT PRIMARY KEY AUTO_INCREMENT,
	`sno` VARCHAR(255) NOT NULL,
	`paperId` INT NOT NULL,
	`status` INT DEFAULT 0,
	`score` INT DEFAULT 0,
	FOREIGN KEY(sno) REFERENCES student(sno) ON UPDATE CASCADE,
	FOREIGN KEY(paperId) REFERENCES paperInfo(paperId) ON UPDATE CASCADE,
	PRIMARY KEY(`sno`, `paperId`)
)ENGINE=INNODB  DEFAULT  CHARSET= UTF8;


# 创建试题表
CREATE TABLE IF NOT EXISTS `questions` (
	`qid` INT PRIMARY KEY AUTO_INCREMENT,
	`paperId` INT NOT NULL,
	`type` INT NOT NULL,
	`title` VARCHAR(2000) NOT NULL,
	`optionAnswer` VARCHAR(2000),
	`answer` 	VARCHAR(100),
	`score` INT NOT NULL,
	FOREIGN KEY(paperId) REFERENCES paperinfo(paperId) ON UPDATE CASCADE
)ENGINE=INNODB  DEFAULT  CHARSET= UTF8;

# 创建班级表
CREATE TABLE IF NOT EXISTS `classes` (
	`classId` INT PRIMARY KEY,
	`id` INT
)ENGINE=INNODB DEFAULT CHARSET=UTF8;