/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : fastify_db

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 11/02/2025 15:30:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fastify_migrations
-- ----------------------------
DROP TABLE IF EXISTS `fastify_migrations`;
CREATE TABLE `fastify_migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `batch` int NULL DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fastify_migrations
-- ----------------------------
INSERT INTO `fastify_migrations` VALUES (1, '20250211114807_create_users_table.js', 1, '2025-02-11 13:56:44');

-- ----------------------------
-- Table structure for fastify_migrations_lock
-- ----------------------------
DROP TABLE IF EXISTS `fastify_migrations_lock`;
CREATE TABLE `fastify_migrations_lock`  (
  `index` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_locked` int NULL DEFAULT NULL,
  PRIMARY KEY (`index`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of fastify_migrations_lock
-- ----------------------------
INSERT INTO `fastify_migrations_lock` VALUES (1, 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Ali Mahfouz', 'alimahfouz1998@gmail.com', '2025-02-11 14:00:43', '2025-02-11 14:00:43');
INSERT INTO `users` VALUES (2, 'Jackson', 'jackson745@gmail.com', '2025-02-11 14:00:43', '2025-02-11 14:00:43');
INSERT INTO `users` VALUES (3, 'Tailor', 'tailor556@gmail.com', '2025-02-11 14:00:43', '2025-02-11 14:00:43');
INSERT INTO `users` VALUES (4, 'Mostafa', 'mostafa588@gmail.com', '2025-02-11 14:00:43', '2025-02-11 14:00:43');
INSERT INTO `users` VALUES (5, 'Batul', 'batul432@gmail.com', '2025-02-11 14:00:43', '2025-02-11 14:00:43');
INSERT INTO `users` VALUES (6, 'Zaid', 'zaid098@gmail.com', '2025-02-11 14:00:43', '2025-02-11 14:00:43');

SET FOREIGN_KEY_CHECKS = 1;
