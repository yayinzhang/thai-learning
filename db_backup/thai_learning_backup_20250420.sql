-- -------------------------------------------------------------
-- TablePlus 6.4.4(604)
--
-- https://tableplus.com/
--
-- Database: thai_learning
-- Generation Time: 2025-04-20 01:51:22.9090
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Article` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chineseContent` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','published') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chineseTitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Article_authorId_fkey` (`authorId`),
  CONSTRAINT `Article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `GrammarExample` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thai` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chinese` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grammarPointId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GrammarExample_grammarPointId_fkey` (`grammarPointId`),
  CONSTRAINT `GrammarExample_grammarPointId_fkey` FOREIGN KEY (`grammarPointId`) REFERENCES `GrammarPoint` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `GrammarPoint` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `explanation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `articleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GrammarPoint_articleId_fkey` (`articleId`),
  CONSTRAINT `GrammarPoint_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Word` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thai` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chinese` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pronunciation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `articleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Word_articleId_fkey` (`articleId`),
  CONSTRAINT `Word_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3ee42a26-d47c-4275-b8f1-03377e14028f', '7ed6d9c0f44bd3a1382273af5d67bcb31bd7856271b6e839b4b6d364fe82d9bd', '2025-04-19 16:36:59.895', '20250419163659_add_chinese_title_to_article', NULL, NULL, '2025-04-19 16:36:59.878', 1),
('62cd5f15-d8e2-419f-b3b4-05a39dd0f325', '715fcb1cca5eb4df315debf9eafcc55f78fdaea4a7452385cada54b5cfae488b', '2025-04-19 16:36:09.968', '20250419130806_init_user_table', NULL, NULL, '2025-04-19 16:36:09.960', 1),
('8014f6c9-0287-4291-8bf5-af79de3682d1', 'e3586643a511ed32de338b3728a1199c1c11f6df202982ea054476345e0c43e7', '2025-04-19 16:36:10.070', '20250419152744_add_username_to_user', NULL, NULL, '2025-04-19 16:36:10.034', 1),
('8a24eeef-8d78-4cee-a4ac-d964f4a998e6', 'e6ab1ec42583e042e1b1d012a7e723a89a8c376fa6e0cd638e670d526415c0f0', '2025-04-19 16:36:10.034', '20250419134016_add_article_status_enum', NULL, NULL, '2025-04-19 16:36:10.026', 1),
('d2ed60fd-df63-4cd2-9537-b4dbcd7d747e', '03acd2df585b660e65c9efe730c925e9a91103fd55577a1fbb81a89938f0c13d', '2025-04-19 16:36:10.026', '20250419131508_add_articles_and_words', NULL, NULL, '2025-04-19 16:36:09.969', 1);

INSERT INTO `Article` (`id`, `title`, `content`, `chineseContent`, `type`, `url`, `status`, `createdAt`, `updatedAt`, `authorId`, `chineseTitle`) VALUES
('6bd0ab16-9fa3-4d87-85eb-1735d6102e05', 'อคติ ‘ไอดอลห้ามมีแฟน’ และการถูกรุกล้ำชีวิตส่วนตัว', 'ข่าวคราวในเกาหลีใต้ที่แฟนคลับลุกขึ้นมาตั้งตัวเป็นแอนตี้แฟนเมื่อเห็นไอดอลที่ติดตามอยู่มีคนรัก...', '韓國的新聞報導指出，當粉絲發現偶像有戀情時，會轉變為「反粉絲」，甚至有騷擾行為...', 'Culture', 'https://mirrorthailand.com/culture/entertainment/102301', 'published', '2025-04-19 16:37:14.752', '2025-04-19 16:37:14.752', 'df3a998a-64cc-4da1-a5ae-f26f411fa6fe', '偶像禁止戀愛，粉絲的瘋狂行為'),
('c207a12b-c297-49c5-b60a-d2b1690ac7a7', 'อีกครั้งที่ ‘JENNIE’ ยังคงถูกด่าเรื่องความเซ็กซี่...', 'เป็นอีกครั้งที่เราต้องยืมประโยคดังในโลกอินเทอร์เน็ตมาพูดจริงๆ ว่า “Birthday but with เจนนี่” ...', '這次我們真的必須藉用網絡世界的一句名言來說“和 Jennie 一起過生日”...', 'Entertainment', 'https://mirrorthailand.com/culture/entertainment/102288', 'published', '2025-04-19 16:37:14.745', '2025-04-19 16:37:14.745', 'df3a998a-64cc-4da1-a5ae-f26f411fa6fe', '又一次，Jennie 因性感被罵');

INSERT INTO `GrammarExample` (`id`, `thai`, `chinese`, `grammarPointId`, `createdAt`, `updatedAt`) VALUES
(1, 'เจนนี่กล้าที่จะแต่งตัวเซ็กซี่', 'Jennie 勇於穿著性感', 1, '2025-04-19 16:37:14.750', '2025-04-19 16:37:14.750'),
(2, 'เมื่อแฟนคลับเห็นว่าไอดอลมีแฟน', '當粉絲看到偶像有戀人時', 2, '2025-04-19 16:37:14.756', '2025-04-19 16:37:14.756');

INSERT INTO `GrammarPoint` (`id`, `title`, `explanation`, `articleId`, `createdAt`, `updatedAt`) VALUES
(1, 'กล้าที่จะ + V', '表示「勇於去做某事」的句型', 'c207a12b-c297-49c5-b60a-d2b1690ac7a7', '2025-04-19 16:37:14.750', '2025-04-19 16:37:14.750'),
(2, 'เมื่อ + 子句', '當...的時候，用來連接兩個事件', '6bd0ab16-9fa3-4d87-85eb-1735d6102e05', '2025-04-19 16:37:14.756', '2025-04-19 16:37:14.756');

INSERT INTO `User` (`id`, `email`, `name`, `createdAt`, `updatedAt`, `role`, `username`) VALUES
('df3a998a-64cc-4da1-a5ae-f26f411fa6fe', 'admin@thai.com', 'Admin', '2025-04-19 16:37:14.739', '2025-04-19 16:37:14.739', 'admin', 'admin');

INSERT INTO `Word` (`id`, `thai`, `chinese`, `type`, `pronunciation`, `articleId`, `createdAt`, `updatedAt`) VALUES
(1, 'เจนนี่', 'Jennie（專有名詞）', 'n.', 'je-n-ni', 'c207a12b-c297-49c5-b60a-d2b1690ac7a7', '2025-04-19 16:37:14.748', '2025-04-19 16:37:14.748'),
(2, 'เซ็กซี่', '性感', 'adj.', 'sèk-sî', 'c207a12b-c297-49c5-b60a-d2b1690ac7a7', '2025-04-19 16:37:14.748', '2025-04-19 16:37:14.748'),
(3, 'วิจารณ์', '評論、批評', 'v.', 'wi-jaan', 'c207a12b-c297-49c5-b60a-d2b1690ac7a7', '2025-04-19 16:37:14.748', '2025-04-19 16:37:14.748'),
(4, 'ไอดอล', '偶像', 'n.', 'ai-don', '6bd0ab16-9fa3-4d87-85eb-1735d6102e05', '2025-04-19 16:37:14.754', '2025-04-19 16:37:14.754'),
(5, 'แฟนคลับ', '粉絲', 'n.', 'faen-kláp', '6bd0ab16-9fa3-4d87-85eb-1735d6102e05', '2025-04-19 16:37:14.754', '2025-04-19 16:37:14.754'),
(6, 'คุกคาม', '騷擾', 'v.', 'kúk-khaam', '6bd0ab16-9fa3-4d87-85eb-1735d6102e05', '2025-04-19 16:37:14.754', '2025-04-19 16:37:14.754');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;