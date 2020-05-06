/*
Navicat MySQL Data Transfer

Source Server         : FunBag
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : funbag

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-05-01 10:33:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bag
-- ----------------------------
DROP TABLE IF EXISTS `bag`;
CREATE TABLE `bag` (
  `id` int(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` varchar(5) NOT NULL COMMENT 'The sort of the funbag.',
  `price` decimal(8,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `from` tinyint(4) NOT NULL,
  `delete_time` datetime(6) NOT NULL,
  `create_time` datetime(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `main_img_url` varchar(255) DEFAULT NULL,
  `img_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bag
-- ----------------------------
INSERT INTO `bag` VALUES ('1', '编织布袋', '1', '4', '7000', '1', '0000-00-00 00:00:00.000000', '2020-02-12 15:53:34.000000', '0000-00-00 00:00:00.000000', '/bigbag.png', '9');
INSERT INTO `bag` VALUES ('2', '帆布袋', '2', '3', '9000', '1', '0000-00-00 00:00:00.000000', '2020-01-01 15:52:56.000000', '0000-00-00 00:00:00.000000', '/fabricbag.png', '10');
INSERT INTO `bag` VALUES ('3', '环保塑料袋', '3', '0', '8000', '1', '0000-00-00 00:00:00.000000', '2020-02-03 15:53:30.000000', null, '/greenbag.png', '11');
INSERT INTO `bag` VALUES ('4', '牛皮纸袋', '4', '1', '15000', '1', '0000-00-00 00:00:00.000000', '2020-02-02 15:53:25.000000', null, '/brownbag.png', '12');
INSERT INTO `bag` VALUES ('5', '普通塑料袋', '5', '0', '3000', '1', '0000-00-00 00:00:00.000000', '2020-02-01 15:53:20.000000', null, '/plasticbag.png', '13');
INSERT INTO `bag` VALUES ('6', '无纺布袋', '6', '2', '5000', '1', '0000-00-00 00:00:00.000000', '2019-12-01 15:53:09.000000', null, '/nonwovenbag.png', '14');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '' COMMENT 'Banner名称，通常作为标识',
  `description` varchar(255) DEFAULT '' COMMENT 'Banner描述',
  `delete_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('1', '首页主图', '置顶主图', null, null);
INSERT INTO `banner` VALUES ('2', '首页副图A', '依需求放置', null, null);
INSERT INTO `banner` VALUES ('3', '首页副图B', '依需求放置', null, null);
INSERT INTO `banner` VALUES ('4', '备用图', '作为备用', null, null);

-- ----------------------------
-- Table structure for banner_item
-- ----------------------------
DROP TABLE IF EXISTS `banner_item`;
CREATE TABLE `banner_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_id` int(11) NOT NULL COMMENT '外键，关联image表',
  `delete_time` datetime(6) DEFAULT NULL,
  `banner_id` int(11) NOT NULL COMMENT '外键，关联banner表',
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of banner_item
-- ----------------------------
INSERT INTO `banner_item` VALUES ('1', '1', null, '1', null);
INSERT INTO `banner_item` VALUES ('2', '2', null, '2', null);
INSERT INTO `banner_item` VALUES ('3', '3', null, '3', null);
INSERT INTO `banner_item` VALUES ('4', '4', null, '4', null);
INSERT INTO `banner_item` VALUES ('5', '18', null, '2', null);
INSERT INTO `banner_item` VALUES ('6', '19', null, '2', null);
INSERT INTO `banner_item` VALUES ('7', '20', null, '2', null);
INSERT INTO `banner_item` VALUES ('8', '21', null, '2', null);
INSERT INTO `banner_item` VALUES ('9', '18', null, '3', null);
INSERT INTO `banner_item` VALUES ('10', '19', null, '3', null);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '图片路径',
  `from` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 来自本地，2 来自公网',
  `delete_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES ('1', '/banner1.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('2', '/banner2.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('3', '/banner3.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('4', '/banner4.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('5', 'theme1.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('6', 'theme2.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('7', 'theme3.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('8', 'theme4.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('9', '/bigbag.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('10', '/fabricbag.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('11', '/greenbag.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('12', '/brownbag.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('13', '/plasticbag.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('14', '/nonwovenbag.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('18', '/listbanner1.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('19', '/listbanner2.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('20', '/listbanner3.png', '1', '0000-00-00 00:00:00.000000', null);
INSERT INTO `image` VALUES ('21', '/listbanner4.png', '1', '0000-00-00 00:00:00.000000', null);

-- ----------------------------
-- Table structure for login_info
-- ----------------------------
DROP TABLE IF EXISTS `login_info`;
CREATE TABLE `login_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of login_info
-- ----------------------------
INSERT INTO `login_info` VALUES ('1', 'Alexander', '123456789');
INSERT INTO `login_info` VALUES ('2', 'AlexanderEzhar', '123456789');
INSERT INTO `login_info` VALUES ('3', 'Ezhajan', '123456789');
INSERT INTO `login_info` VALUES ('4', 'Ezhajan1', '123456789');
INSERT INTO `login_info` VALUES ('5', 'Tonny', '123456789');

-- ----------------------------
-- Table structure for machine
-- ----------------------------
DROP TABLE IF EXISTS `machine`;
CREATE TABLE `machine` (
  `machine_id` int(11) NOT NULL,
  `machine_states` int(5) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `create_time` datetime(6) NOT NULL,
  `delete_time` datetime(6) DEFAULT NULL,
  `machine_address` varchar(80) NOT NULL,
  `machine_type` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of machine
-- ----------------------------
INSERT INTO `machine` VALUES ('1', '1', '2020-02-06 16:09:21.000000', '2019-12-01 16:09:27.000000', null, '平乐园小区某客隆#1038号店', '1');

-- ----------------------------
-- Table structure for machine_info
-- ----------------------------
DROP TABLE IF EXISTS `machine_info`;
CREATE TABLE `machine_info` (
  `id` int(11) NOT NULL,
  `machine_type` varchar(255) NOT NULL,
  `machine_id` int(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of machine_info
-- ----------------------------
INSERT INTO `machine_info` VALUES ('1', 'haha', '99');

-- ----------------------------
-- Table structure for machine_state
-- ----------------------------
DROP TABLE IF EXISTS `machine_state`;
CREATE TABLE `machine_state` (
  `state` varchar(100) NOT NULL,
  `machine_id` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of machine_state
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(20) NOT NULL COMMENT '订单号',
  `user_id` int(11) NOT NULL COMMENT '外键，用户id，注意并不是openid',
  `delete_time` datetime(6) DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `total_price` decimal(6,2) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1:未支付， 2：已支付，3：已发货 , 4: 已支付，但库存不足',
  `snap_img` varchar(255) DEFAULT '' COMMENT '订单快照图片',
  `snap_name` varchar(80) DEFAULT '' COMMENT '订单快照名称',
  `total_count` int(11) NOT NULL DEFAULT 0,
  `update_time` int(6) DEFAULT NULL,
  `snap_items` text DEFAULT NULL COMMENT '订单其他信息快照（json)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for theme
-- ----------------------------
DROP TABLE IF EXISTS `theme`;
CREATE TABLE `theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '专题名称',
  `description` varchar(255) DEFAULT '' COMMENT '专题描述',
  `topic_img_id` int(11) NOT NULL COMMENT '主题图，外键',
  `delete_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of theme
-- ----------------------------
INSERT INTO `theme` VALUES ('1', '栏位A', '放置种类', '18', null, null);
INSERT INTO `theme` VALUES ('2', '栏位B', '需求A', '19', null, null);
INSERT INTO `theme` VALUES ('3', '栏位C', '需求B', '20', null, null);
INSERT INTO `theme` VALUES ('4', '栏位D', '需求C', '21', null, null);

-- ----------------------------
-- Table structure for theme_bag
-- ----------------------------
DROP TABLE IF EXISTS `theme_bag`;
CREATE TABLE `theme_bag` (
  `theme_id` int(11) NOT NULL COMMENT '主题外键',
  `bag_id` int(11) NOT NULL COMMENT '商品外键',
  PRIMARY KEY (`theme_id`,`bag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of theme_bag
-- ----------------------------
INSERT INTO `theme_bag` VALUES ('1', '1');
INSERT INTO `theme_bag` VALUES ('2', '2');
INSERT INTO `theme_bag` VALUES ('3', '3');
INSERT INTO `theme_bag` VALUES ('4', '1');
INSERT INTO `theme_bag` VALUES ('5', '2');
INSERT INTO `theme_bag` VALUES ('6', '3');
INSERT INTO `theme_bag` VALUES ('7', '4');
INSERT INTO `theme_bag` VALUES ('8', '5');
INSERT INTO `theme_bag` VALUES ('9', '6');
INSERT INTO `theme_bag` VALUES ('10', '1');
INSERT INTO `theme_bag` VALUES ('11', '2');
INSERT INTO `theme_bag` VALUES ('13', '3');
INSERT INTO `theme_bag` VALUES ('14', '4');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` int(11) DEFAULT NULL,
  `nickname` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', null, null);
INSERT INTO `user` VALUES ('2', null, null);
INSERT INTO `user` VALUES ('3', null, null);
INSERT INTO `user` VALUES ('4', null, null);
INSERT INTO `user` VALUES ('5', null, null);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wallet` int(11) NOT NULL,
  `user_type` varchar(30) NOT NULL,
  `user_name` varchar(30) NOT NULL COMMENT '用户姓名',
  `user_phone` varchar(20) NOT NULL COMMENT '手机号',
  `user_address` varchar(20) DEFAULT '' COMMENT '用户地址',
  `delete_time` datetime(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL COMMENT '外键',
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('6', '1000', 'vip', 'Te43334st4', '13899010201', 'k4444kkkk', null, '1', null);
INSERT INTO `user_info` VALUES ('7', '1000', 'vip', 'Alexander', '13801190119', '北京市中南海6号墅301室', null, '4', null);
