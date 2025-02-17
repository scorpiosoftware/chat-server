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

 Date: 17/02/2025 11:00:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat_rooms
-- ----------------------------
DROP TABLE IF EXISTS `chat_rooms`;
CREATE TABLE `chat_rooms`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin_id` int UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `chat_rooms_admin_id_foreign`(`admin_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat_rooms
-- ----------------------------
INSERT INTO `chat_rooms` VALUES (1, 'Department 1', 1, '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `chat_rooms` VALUES (2, 'Department 2', 2, '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `chat_rooms` VALUES (3, 'Department 3', 3, '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `chat_rooms` VALUES (4, 'Department 4', 4, '2025-02-17 10:59:28', '2025-02-17 10:59:28');

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
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fastify_migrations
-- ----------------------------
INSERT INTO `fastify_migrations` VALUES (1, '20250211114807_create_users_table.js', 1, '2025-02-17 10:59:12');
INSERT INTO `fastify_migrations` VALUES (2, '20250211170019_create_chat_rooms_table.js', 1, '2025-02-17 10:59:12');
INSERT INTO `fastify_migrations` VALUES (3, '20250211170020_create_messages_table.js', 1, '2025-02-17 10:59:12');
INSERT INTO `fastify_migrations` VALUES (4, '20250212104750_create_users_rooms_table.js', 1, '2025-02-17 10:59:12');

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
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `room_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `messages_user_id_foreign`(`user_id`) USING BTREE,
  INDEX `messages_room_id_foreign`(`room_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of messages
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '12345678',
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin', 'admin@admin.com', '12345678', 'admin', '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `users` VALUES (2, 'Ali Mahfouz', 'alimahfouz1998@gmail.com', '12345678', 'user', '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `users` VALUES (3, 'Jackson', 'jackson745@gmail.com', '12345678', 'user', '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `users` VALUES (4, 'Tailor', 'tailor556@gmail.com', '12345678', 'user', '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `users` VALUES (5, 'Mostafa', 'mostafa588@gmail.com', '12345678', 'user', '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `users` VALUES (6, 'Batul', 'batul432@gmail.com', '12345678', 'user', '2025-02-17 10:59:28', '2025-02-17 10:59:28');
INSERT INTO `users` VALUES (7, 'Zaid', 'zaid098@gmail.com', '12345678', 'user', '2025-02-17 10:59:28', '2025-02-17 10:59:28');

-- ----------------------------
-- Table structure for users_chat_rooms
-- ----------------------------
DROP TABLE IF EXISTS `users_chat_rooms`;
CREATE TABLE `users_chat_rooms`  (
  `user_id` int UNSIGNED NOT NULL,
  `room_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `room_id`) USING BTREE,
  INDEX `users_chat_rooms_room_id_foreign`(`room_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of users_chat_rooms
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
