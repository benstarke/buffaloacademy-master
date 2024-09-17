-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2024 at 05:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elbapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_misaudit_trail`
--

CREATE TABLE `api_misaudit_trail` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `table_action` varchar(255) NOT NULL,
  `record_id` int(11) DEFAULT NULL,
  `prev_tabledata` longtext DEFAULT NULL,
  `current_tabledata` longtext DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_on` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(250) DEFAULT NULL,
  `updated_on` varchar(250) DEFAULT NULL,
  `altered_by` varchar(250) DEFAULT NULL,
  `altered_on` varchar(250) DEFAULT NULL,
  `altered_at` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `api_misaudit_trail`
--

INSERT INTO `api_misaudit_trail` (`id`, `table_name`, `table_action`, `record_id`, `prev_tabledata`, `current_tabledata`, `ip_address`, `created_by`, `created_on`, `created_at`, `updated_at`, `updated_by`, `updated_on`, `altered_by`, `altered_on`, `altered_at`) VALUES
(1, 'par_company_branch_info', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-16 07:08:11', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'par_company_branch_info', 'update', NULL, 's:288:\"{\"id\":8,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"Our Branches\",\"description\":\"The Buffalo Academy company Branch description\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 10:08:11\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', 's:331:\"{\"id\":8,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"Our Branches\",\"description\":\"The Buffalo Academy company Branch description about the listed branches\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 10:08:11\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:09:42\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '8', NULL, '2024-07-16 07:09:42', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'par_company_branch_info', 'insert', NULL, NULL, '9', '127.0.0.1', '9', NULL, '2024-07-16 07:10:49', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'par_company_branch_info', 'delete', NULL, 's:310:\"{\"id\":9,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"hkjklklk\",\"description\":\"The Buffalo Academy company Branch description about the listed branches\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 10:10:49\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '9', NULL, '2024-07-16 07:11:14', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'par_company_branch_info', 'delete', NULL, 's:331:\"{\"id\":8,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"Our Branches\",\"description\":\"The Buffalo Academy company Branch description about the listed branches\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 10:08:11\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:09:42\",\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '8', NULL, '2024-07-16 07:21:14', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'par_company_branch_info', 'update', NULL, 's:288:\"{\"id\":1,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"Our Branches\",\"description\":\"The Buffalo Academy company Branch description\",\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', 's:331:\"{\"id\":1,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"All branches\",\"description\":\"The Buffalo Academy company Branch description about the listed branches\",\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:22:42\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '1', NULL, '2024-07-16 07:22:42', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'par_company_branch_info', 'update', NULL, 's:331:\"{\"id\":1,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"All branches\",\"description\":\"The Buffalo Academy company Branch description about the listed branches\",\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:22:42\",\"altered_by\":null,\"altered_on\":null}\";', 's:331:\"{\"id\":1,\"contact_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"Our branches\",\"description\":\"The Buffalo Academy company Branch description about the listed branches\",\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:22:58\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '1', NULL, '2024-07-16 07:22:58', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'par_company_branch_info', 'insert', NULL, NULL, '10', '127.0.0.1', '10', NULL, '2024-07-16 07:23:19', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'par_company_branches', 'update', NULL, 's:235:\"{\"id\":1,\"name\":\"Nairobi\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', 's:252:\"{\"id\":1,\"name\":\"Nairobi\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:45:43\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '1', NULL, '2024-07-16 07:45:43', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'par_company_branches', 'update', NULL, 's:252:\"{\"id\":1,\"name\":\"Nairobi\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:45:43\",\"altered_by\":null,\"altered_on\":null}\";', 's:254:\"{\"id\":1,\"name\":\"Nairobiww\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:45:50\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '1', NULL, '2024-07-16 07:45:50', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'par_company_branches', 'update', NULL, 's:254:\"{\"id\":1,\"name\":\"Nairobiww\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:45:50\",\"altered_by\":null,\"altered_on\":null}\";', 's:252:\"{\"id\":1,\"name\":\"Nairobi\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-03-14 10:00:48\",\"updated_by\":null,\"updated_at\":\"2024-07-16 10:46:15\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '1', NULL, '2024-07-16 07:46:15', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'par_company_branches', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-16 07:46:30', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'par_company_branches', 'delete', NULL, 's:239:\"{\"id\":8,\"name\":\"Nairobiweew\",\"description\":\"Where our main branch operates\",\"initial\":\"NA\",\"branch_icon_id\":14,\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 10:46:30\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '8', NULL, '2024-07-16 07:46:51', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'par_contact', 'insert', NULL, NULL, '3', '127.0.0.1', '3', NULL, '2024-07-16 07:53:17', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'par_contact', 'update', NULL, 's:242:\"{\"id\":3,\"name\":\"benSDS\",\"email\":\"omusi.ben@gmail.com\",\"subject\":\"Data science\",\"message\":\"Machine Learning modelling\",\"created_by\":\"1\",\"created_at\":\"2024-07-16 10:53:17\",\"altered_by\":null,\"altered_at\":null,\"updated_by\":null,\"updated_at\":null}\";', 's:262:\"{\"id\":3,\"name\":\"benSDSSDSD\",\"email\":\"omusi.ben@gmail.com\",\"subject\":\"Data science\",\"message\":\"Machine Learning modelling\",\"created_by\":\"1\",\"created_at\":\"2024-07-16 10:53:17\",\"altered_by\":null,\"altered_at\":null,\"updated_by\":\"1\",\"updated_at\":\"2024-07-16 10:53:48\"}\";', '127.0.0.1', '3', NULL, '2024-07-16 07:53:48', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'par_contact', 'delete', NULL, 's:262:\"{\"id\":3,\"name\":\"benSDSSDSD\",\"email\":\"omusi.ben@gmail.com\",\"subject\":\"Data science\",\"message\":\"Machine Learning modelling\",\"created_by\":\"1\",\"created_at\":\"2024-07-16 10:53:17\",\"altered_by\":null,\"altered_at\":null,\"updated_by\":\"1\",\"updated_at\":\"2024-07-16 10:53:48\"}\";', NULL, '127.0.0.1', '3', NULL, '2024-07-16 07:54:02', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'par_contact_info', 'insert', NULL, NULL, '5', '127.0.0.1', '5', NULL, '2024-07-16 08:09:25', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'par_contact_info', 'update', NULL, 's:195:\"{\"id\":5,\"phone_icon_id\":2,\"company_phone_number\":\"+254 312 937557\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 11:09:25\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', 's:206:\"{\"id\":5,\"phone_icon_id\":2,\"company_phone_number\":\"1211212762\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 11:09:25\",\"updated_by\":\"2\",\"updated_at\":\"2024-07-16 11:11:18\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '5', NULL, '2024-07-16 08:11:18', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'par_contact_info', 'delete', NULL, 's:206:\"{\"id\":5,\"phone_icon_id\":2,\"company_phone_number\":\"1211212762\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 11:09:25\",\"updated_by\":\"2\",\"updated_at\":\"2024-07-16 11:11:18\",\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '5', NULL, '2024-07-16 08:11:44', NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'par_contact_info', 'update', NULL, 's:186:\"{\"id\":4,\"phone_icon_id\":2,\"company_phone_number\":\"1211212762\",\"created_by\":\"1\",\"created_at\":\"2024-03-09 15:43:35\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', 's:202:\"{\"id\":4,\"phone_icon_id\":2,\"company_phone_number\":\"1211212762\",\"created_by\":\"1\",\"created_at\":\"2024-03-09 15:43:35\",\"updated_by\":\"2\",\"updated_at\":\"2024-07-16 11:18:06\",\"altered_by\":null,\"altered_on\":null}\";', '127.0.0.1', '4', NULL, '2024-07-16 08:18:06', NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'par_email_info', 'insert', NULL, NULL, '3', '127.0.0.1', '3', NULL, '2024-07-16 08:25:30', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'par_email_info', 'delete', NULL, 's:202:\"{\"id\":3,\"email_icon_id\":3,\"company_email\":\"info@dsdthebuffaloacademy.com\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 11:25:30\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '3', NULL, '2024-07-16 08:25:56', NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'par_address_info', 'insert', NULL, NULL, '7', '127.0.0.1', '7', NULL, '2024-07-16 08:33:20', NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'par_address_info', 'delete', NULL, 's:231:\"{\"id\":7,\"address_icon_id\":1,\"street_address_name\":\"201, sdRonald Ngala\",\"city\":\"Nairobi\",\"country\":\"Kenya\",\"created_by\":\"2\",\"created_at\":\"2024-07-16 11:33:20\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '7', NULL, '2024-07-16 08:33:42', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'par_about_info', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-16 08:44:44', NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'par_about_info', 'delete', NULL, 's:1127:\"{\"id\":8,\"about_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"description\":\"Vestibulum efficitur accumsan sapien ut lacinia. Sed euismod ullamcorper rhoncus. Phasellus interdum rutrum nisi ut lacinia. Nulla et sapien at turpis viverra. Cras odio ex, posuere id est et, viverra condimentum felis congue quis non odio. Aliquam sem ligula, commodo quis ipsum mattis, lacinia cursus magna.\",\"who_we_are\":\"Suspendisse potenti. Pellentesque augue ligula, dictum at pretium eu, fermentum sit amet risus. Maecenas congue feugiat libero, sed euismod urna congue eleifend. Maecenas et gravida felis. Vivamus iaculis tellus sit amet egestas luctus. Phasellus urna eros.\",\"our_mission\":\"Maecenas consectetur ultrices tortor, eget efficitur tortor finibus at. Sed convallis efficitur turpis, eget dapibus magna. Nam euismod lacus ac nulla vehicula aliquam.Curabitur efficitur vehicula sagittis. Cras convallis tellus ac quam efficitur viverra. Maecenas consectetur\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 11:44:44\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null,\"title\":\"A Great Place To Grow.sd\"}\";', NULL, '127.0.0.1', '8', NULL, '2024-07-16 08:45:05', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'par_footer_info', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-16 08:57:38', NULL, NULL, NULL, NULL, NULL, NULL),
(28, 'par_footer_info', 'delete', NULL, 's:314:\"{\"id\":8,\"description\":\"Our commitment is to guide you to the finest online par_courses, offering expert insights whenever and wherever you are.\",\"year\":\"2024\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 11:57:38\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null,\"title\":\"The Buffalo Academys\"}\";', NULL, '127.0.0.1', '8', NULL, '2024-07-16 08:58:14', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'par_icons', 'insert', NULL, NULL, '16', '127.0.0.1', '16', NULL, '2024-07-16 09:04:03', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'par_icons', 'delete', NULL, 's:228:\"{\"id\":16,\"name\":\"Youtubed\",\"description\":null,\"code\":null,\"is_enabled\":null,\"icon\":\"fab fa-youtube\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 12:04:03\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '16', NULL, '2024-07-16 09:04:25', NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'par_partners_info', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-16 09:10:22', NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'par_partners_info', 'delete', NULL, 's:267:\"{\"id\":8,\"partner_logo_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"name\":\"Internationl dHearts\",\"description\":\"Internationl Hearts\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-16 12:10:22\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_on\":null}\";', NULL, '127.0.0.1', '8', NULL, '2024-07-16 09:10:49', NULL, NULL, NULL, NULL, NULL, NULL),
(33, 'par_tags', 'insert', NULL, NULL, '15', '127.0.0.1', '15', NULL, '2024-07-18 09:25:46', NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'par_tags', 'insert', NULL, NULL, '16', '127.0.0.1', '16', NULL, '2024-07-18 09:27:51', NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'par_tags', 'insert', NULL, NULL, '17', '127.0.0.1', NULL, NULL, '2024-07-18 09:35:34', NULL, NULL, NULL, NULL, NULL, NULL),
(36, 'par_about_info', 'insert', NULL, NULL, '9', '127.0.0.1', '9', NULL, '2024-07-18 09:36:21', NULL, NULL, NULL, NULL, NULL, NULL),
(37, 'par_about_info', 'delete', NULL, 's:1127:\"{\"id\":9,\"about_image_path\":\"public\\/system_partners\\/65ec396f57d5d.jpg\",\"title\":\"A Great Place To Grow.we\",\"description\":\"Vestibulum efficitur accumsan sapien ut lacinia. Sed euismod ullamcorper rhoncus. Phasellus interdum rutrum nisi ut lacinia. Nulla et sapien at turpis viverra. Cras odio ex, posuere id est et, viverra condimentum felis congue quis non odio. Aliquam sem ligula, commodo quis ipsum mattis, lacinia cursus magna.\",\"who_we_are\":\"Suspendisse potenti. Pellentesque augue ligula, dictum at pretium eu, fermentum sit amet risus. Maecenas congue feugiat libero, sed euismod urna congue eleifend. Maecenas et gravida felis. Vivamus iaculis tellus sit amet egestas luctus. Phasellus urna eros.\",\"our_mission\":\"Maecenas consectetur ultrices tortor, eget efficitur tortor finibus at. Sed convallis efficitur turpis, eget dapibus magna. Nam euismod lacus ac nulla vehicula aliquam.Curabitur efficitur vehicula sagittis. Cras convallis tellus ac quam efficitur viverra. Maecenas consectetur\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-18 12:36:21\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '9', NULL, '2024-07-18 09:37:31', NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'par_address_info', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-18 09:42:04', NULL, NULL, NULL, NULL, NULL, NULL),
(39, 'par_address_info', 'insert', NULL, NULL, '9', '127.0.0.1', '9', NULL, '2024-07-18 13:44:21', NULL, NULL, NULL, NULL, NULL, NULL),
(40, 'par_tags', 'insert', NULL, NULL, '18', '127.0.0.1', NULL, NULL, '2024-07-18 13:46:18', NULL, NULL, NULL, NULL, NULL, NULL),
(41, 'par_tags', 'insert', NULL, NULL, '19', '127.0.0.1', NULL, NULL, '2024-07-18 13:48:12', NULL, NULL, NULL, NULL, NULL, NULL),
(42, 'par_tags', 'update', NULL, 's:224:\"{\"id\":19,\"name\":\"uie weweewe hkjsedsdsd\",\"description\":\"the first tags\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 16:48:12\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', 's:243:\"{\"id\":19,\"name\":\"uie weweewe hkjsedsdsdsd\",\"description\":\"the first tags\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 16:48:12\",\"updated_by\":null,\"updated_at\":\"2024-07-18 16:49:19\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', '19', NULL, '2024-07-18 13:49:19', NULL, NULL, NULL, NULL, NULL, NULL),
(43, 'par_tags', 'delete', NULL, 's:243:\"{\"id\":19,\"name\":\"uie weweewe hkjsedsdsdsd\",\"description\":\"the first tags\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 16:48:12\",\"updated_by\":null,\"updated_at\":\"2024-07-18 16:49:19\",\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '19', NULL, '2024-07-18 13:50:02', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'par_blog_status', 'insert', NULL, NULL, '12', '127.0.0.1', NULL, NULL, '2024-07-18 14:00:15', NULL, NULL, NULL, NULL, NULL, NULL),
(45, 'par_blog_status', 'update', NULL, 's:199:\"{\"id\":12,\"name\":\"sdsdssd\",\"description\":\"jsdk\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 17:00:15\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', 's:219:\"{\"id\":12,\"name\":\"sdsdssdjsd\",\"description\":\"jsdk\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 17:00:15\",\"updated_by\":null,\"updated_at\":\"2024-07-18 17:00:41\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-07-18 14:00:41', NULL, NULL, NULL, NULL, NULL, NULL),
(46, 'par_blog_status', 'delete', NULL, 's:219:\"{\"id\":12,\"name\":\"sdsdssdjsd\",\"description\":\"jsdk\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 17:00:15\",\"updated_by\":null,\"updated_at\":\"2024-07-18 17:00:41\",\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-07-18 14:00:53', NULL, NULL, NULL, NULL, NULL, NULL),
(47, 'par_blog_categories', 'insert', NULL, NULL, '{\"id\":9,\"name\":\"sdsd\",\"description\":\"Data center concept.\"}', '127.0.0.1', NULL, NULL, '2024-07-18 14:28:07', NULL, NULL, NULL, NULL, NULL, NULL),
(48, 'par_blog_categories', 'update', NULL, 's:211:\"{\"id\":9,\"name\":\"sdsd\",\"description\":\"Data center concept.\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 17:28:07\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', 's:231:\"{\"id\":9,\"name\":\"sdsd hj\",\"description\":\"Data center concept.\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 17:28:07\",\"updated_by\":null,\"updated_at\":\"2024-07-18 17:28:38\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-07-18 14:28:38', NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'par_blog_categories', 'delete', NULL, 's:231:\"{\"id\":9,\"name\":\"sdsd hj\",\"description\":\"Data center concept.\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 17:28:07\",\"updated_by\":null,\"updated_at\":\"2024-07-18 17:28:38\",\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-07-18 14:29:04', NULL, NULL, NULL, NULL, NULL, NULL),
(50, 'par_blogs', 'insert', NULL, NULL, '27', '127.0.0.1', NULL, NULL, '2024-07-18 14:45:27', NULL, NULL, NULL, NULL, NULL, NULL),
(51, 'par_blogs', 'insert', NULL, NULL, '28', '127.0.0.1', NULL, NULL, '2024-07-18 15:07:45', NULL, NULL, NULL, NULL, NULL, NULL),
(52, 'par_blogs', 'insert', NULL, NULL, '29', '127.0.0.1', NULL, NULL, '2024-07-18 15:28:11', NULL, NULL, NULL, NULL, NULL, NULL),
(53, 'par_blogs', 'delete', NULL, 's:379:\"{\"id\":29,\"tags_id\":3,\"blog_categories_id\":2,\"blog_status_id\":1,\"name\":\"new blog tHREE WHITE\",\"description\":\"new blog\",\"code\":null,\"is_enabled\":0,\"blog_image_path\":\"views\\/dev_portal\\/buffalofrontend\\/src\\/assets\\/uploads\\/blogs-posts\\/66995ebb6fad1.jpg\",\"created_by\":null,\"created_at\":\"2024-07-18 18:28:11\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-07-18 17:16:02', NULL, NULL, NULL, NULL, NULL, NULL),
(54, 'par_blogs', 'update', NULL, 's:383:\"{\"id\":28,\"tags_id\":2,\"blog_categories_id\":2,\"blog_status_id\":2,\"name\":\"chapter three\",\"description\":null,\"code\":null,\"is_enabled\":0,\"blog_image_path\":\"views\\/dev_portal\\/buffalofrontend\\/src\\/assets\\/uploads\\/blogs-posts\\/669959f185c32.jpg\",\"created_by\":null,\"created_at\":\"2024-07-18 18:07:45\",\"updated_by\":null,\"updated_at\":\"2024-07-18 20:21:16\",\"altered_by\":null,\"altered_at\":null}\";', 's:384:\"{\"id\":28,\"tags_id\":3,\"blog_categories_id\":1,\"blog_status_id\":11,\"name\":\"chapter three\",\"description\":null,\"code\":null,\"is_enabled\":0,\"blog_image_path\":\"views\\/dev_portal\\/buffalofrontend\\/src\\/assets\\/uploads\\/blogs-posts\\/669959f185c32.jpg\",\"created_by\":null,\"created_at\":\"2024-07-18 18:07:45\",\"updated_by\":null,\"updated_at\":\"2024-07-18 20:27:25\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-07-18 17:27:25', NULL, NULL, NULL, NULL, NULL, NULL),
(55, 'par_contact', 'insert', NULL, NULL, '4', '127.0.0.1', '4', NULL, '2024-07-19 05:53:03', NULL, NULL, NULL, NULL, NULL, NULL),
(56, 'par_contact', 'insert', NULL, NULL, '5', '127.0.0.1', '5', NULL, '2024-07-19 05:53:15', NULL, NULL, NULL, NULL, NULL, NULL),
(57, 'par_contact', 'insert', NULL, NULL, '6', '127.0.0.1', '6', NULL, '2024-07-19 06:46:49', NULL, NULL, NULL, NULL, NULL, NULL),
(58, 'par_contact', 'insert', NULL, NULL, '7', '127.0.0.1', '7', NULL, '2024-07-19 06:47:29', NULL, NULL, NULL, NULL, NULL, NULL),
(59, 'par_contact', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-19 06:48:23', NULL, NULL, NULL, NULL, NULL, NULL),
(60, 'par_contact', 'insert', NULL, NULL, '9', '127.0.0.1', '9', NULL, '2024-07-19 06:49:26', NULL, NULL, NULL, NULL, NULL, NULL),
(61, 'par_contact', 'insert', NULL, NULL, '10', '127.0.0.1', '10', NULL, '2024-07-19 06:50:15', NULL, NULL, NULL, NULL, NULL, NULL),
(62, 'par_contact', 'insert', NULL, NULL, '11', '127.0.0.1', '11', NULL, '2024-07-19 06:52:21', NULL, NULL, NULL, NULL, NULL, NULL),
(63, 'par_contact', 'insert', NULL, NULL, '12', '127.0.0.1', '12', NULL, '2024-07-19 06:56:22', NULL, NULL, NULL, NULL, NULL, NULL),
(64, 'par_contact', 'insert', NULL, NULL, '13', '127.0.0.1', '13', NULL, '2024-07-19 06:56:44', NULL, NULL, NULL, NULL, NULL, NULL),
(65, 'par_contact', 'insert', NULL, NULL, '14', '127.0.0.1', '14', NULL, '2024-07-19 06:59:10', NULL, NULL, NULL, NULL, NULL, NULL),
(66, 'par_contact', 'insert', NULL, NULL, '15', '127.0.0.1', '15', NULL, '2024-07-19 06:59:55', NULL, NULL, NULL, NULL, NULL, NULL),
(67, 'par_contact', 'insert', NULL, NULL, '16', '127.0.0.1', '16', NULL, '2024-07-19 07:01:06', NULL, NULL, NULL, NULL, NULL, NULL),
(68, 'par_contact', 'insert', NULL, NULL, '17', '127.0.0.1', '17', NULL, '2024-07-19 07:02:06', NULL, NULL, NULL, NULL, NULL, NULL),
(69, 'par_contact', 'insert', NULL, NULL, '18', '127.0.0.1', '18', NULL, '2024-07-19 08:20:41', NULL, NULL, NULL, NULL, NULL, NULL),
(70, 'par_contact', 'insert', NULL, NULL, '19', '127.0.0.1', '19', NULL, '2024-07-19 08:23:44', NULL, NULL, NULL, NULL, NULL, NULL),
(71, 'par_contact', 'insert', NULL, NULL, '20', '127.0.0.1', '20', NULL, '2024-07-19 08:59:41', NULL, NULL, NULL, NULL, NULL, NULL),
(72, 'par_contact', 'insert', NULL, NULL, '21', '127.0.0.1', '21', NULL, '2024-07-19 09:07:00', NULL, NULL, NULL, NULL, NULL, NULL),
(77, 'par_learning_steps', 'insert', NULL, NULL, '8', '127.0.0.1', '8', NULL, '2024-07-19 14:06:44', NULL, NULL, NULL, NULL, NULL, NULL),
(78, 'par_learning_steps', 'insert', NULL, NULL, '9', '127.0.0.1', '9', NULL, '2024-07-19 14:15:14', NULL, NULL, NULL, NULL, NULL, NULL),
(79, 'par_learning_steps', 'insert', NULL, NULL, '10', '127.0.0.1', '10', NULL, '2024-07-19 14:18:02', NULL, NULL, NULL, NULL, NULL, NULL),
(80, 'par_learning_steps', 'delete', NULL, 's:270:\"{\"id\":8,\"step_number\":\"4\",\"title\":\"another one\",\"description\":\"another one\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-19 17:06:44\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null,\"image\":\"assets\\/uploads\\/home\\/learningsteps\\/669a9d24754a8.jpg\"}\";', NULL, '127.0.0.1', '8', NULL, '2024-07-19 18:06:41', NULL, NULL, NULL, NULL, NULL, NULL),
(81, 'par_learning_steps', 'delete', NULL, 's:270:\"{\"id\":9,\"step_number\":\"4\",\"title\":\"another two\",\"description\":\"another two\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-19 17:15:14\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null,\"image\":\"assets\\/uploads\\/home\\/learningsteps\\/669a9f2221ba2.jpg\"}\";', NULL, '127.0.0.1', '9', NULL, '2024-07-19 18:06:47', NULL, NULL, NULL, NULL, NULL, NULL),
(82, 'par_learning_steps', 'delete', NULL, 's:275:\"{\"id\":10,\"step_number\":\"4\",\"title\":\"another three\",\"description\":\"another three\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-19 17:18:02\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null,\"image\":\"assets\\/uploads\\/home\\/learningsteps\\/669a9fca612b2.jpg\"}\";', NULL, '127.0.0.1', '10', NULL, '2024-07-19 18:06:52', NULL, NULL, NULL, NULL, NULL, NULL),
(84, 'par_course_categories', 'insert', NULL, NULL, '57', '127.0.0.1', NULL, NULL, '2024-07-24 14:25:16', NULL, NULL, NULL, NULL, NULL, NULL),
(85, 'par_course_sub_categories', 'insert', NULL, NULL, '57', '127.0.0.1', NULL, NULL, '2024-07-24 18:13:59', NULL, NULL, NULL, NULL, NULL, NULL),
(86, 'par_course_sub_categories', 'delete', NULL, 's:282:\"{\"id\":57,\"sub_category_name\":\"sub category one\",\"sub_category_status\":1,\"sub_category_image\":\"uploads\\/courses\\/course-sub-categories\\/66a16e96a11ff.jpg\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-24 21:13:58\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-07-24 18:14:35', NULL, NULL, NULL, NULL, NULL, NULL),
(87, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"uploads\\/courses\\/course-images\\/66a629aa72f69.jpg\",\"thumbnail_image\":\"uploads\\/courses\\/course-thumbnails-images\\/66a629aa735b4.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-28T11:21:14.474527Z\"}', '127.0.0.1', NULL, NULL, '2024-07-28 08:21:14', NULL, NULL, NULL, NULL, NULL, NULL),
(88, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66a62dae840d2.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66a62dae848a9.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-28T11:38:22.544815Z\"}', '127.0.0.1', NULL, NULL, '2024-07-28 08:38:22', NULL, NULL, NULL, NULL, NULL, NULL),
(89, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/66a631254df88.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66a6312550014.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-28T11:53:09.330766Z\"}', '127.0.0.1', NULL, NULL, '2024-07-28 08:53:09', NULL, NULL, NULL, NULL, NULL, NULL),
(90, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66a6381653f69.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66a6381655683.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-28T12:22:46.352670Z\"}', '127.0.0.1', NULL, NULL, '2024-07-28 09:22:46', NULL, NULL, NULL, NULL, NULL, NULL),
(91, 'par_courses', 'delete', NULL, 's:621:\"{\"id\":60,\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":1,\"course_sub_category_id\":1,\"course_type_id\":1,\"course_difficulty_id\":1,\"course_tag_id\":1,\"price\":\"23.00\",\"old_price\":\"22.00\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66a6381653f69.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66a6381655683.jpg\",\"thumbnail_video\":null,\"status\":1,\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-28 12:22:46\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-07-28 09:26:51', NULL, NULL, NULL, NULL, NULL, NULL),
(92, 'par_courses', 'delete', NULL, 's:606:\"{\"id\":59,\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":1,\"course_sub_category_id\":1,\"course_type_id\":1,\"course_difficulty_id\":1,\"course_tag_id\":1,\"price\":\"23.00\",\"old_price\":\"22.00\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/66a631254df88.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66a6312550014.jpg\",\"thumbnail_video\":null,\"status\":1,\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-28 11:53:09\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-07-28 09:27:13', NULL, NULL, NULL, NULL, NULL, NULL),
(93, 'par_instructors', 'insert', NULL, NULL, '{\"name_en\":\"Koja Johns\",\"name_bn\":null,\"contact_en\":\"+243718004262\",\"contact_bn\":null,\"email\":\"koja234@gmail.com\",\"role_id\":\"3\",\"bio\":null,\"title\":null,\"designation\":null,\"image\":null,\"status\":\"1\",\"password\":\"$2y$12$BVYNhaBHvVju7JZIycDa5enOcxsXqx1KBUJ50vsV.zuBGzv2qB4gS\",\"language\":null,\"instagram\":null,\"linkedin\":null,\"twitter\":null,\"youtube\":null,\"facebook\":null,\"created_by\":null,\"created_at\":\"2024-07-29T08:13:37.110716Z\"}', '127.0.0.1', NULL, NULL, '2024-07-29 05:13:37', NULL, NULL, NULL, NULL, NULL, NULL),
(94, 'par_instructors', 'insert', NULL, NULL, '{\"name_en\":\"Koja Johns\",\"name_bn\":null,\"contact_en\":\"+243718004262\",\"contact_bn\":null,\"email\":\"koja234@gmail.com\",\"role_id\":\"3\",\"bio\":null,\"title\":null,\"designation\":null,\"image\":\"assets\\/uploads\\/instructors\\/66a74f8f64778.jpg\",\"status\":\"1\",\"password\":\"$2y$12$acPusrHOV1SFodpHd.2coO7K27WHkJ3uk3OgQRRIyefs8n1cUmjtO\",\"language\":null,\"instagram\":null,\"linkedin\":null,\"twitter\":null,\"youtube\":null,\"facebook\":null,\"created_by\":null,\"created_at\":\"2024-07-29T08:15:11.760670Z\"}', '127.0.0.1', NULL, NULL, '2024-07-29 05:15:11', NULL, NULL, NULL, NULL, NULL, NULL),
(95, 'par_instructor_education', 'insert', NULL, NULL, '{\"instructor_id\":1,\"level_name\":\"Bachelor degree\",\"level_description\":\"Computer science\",\"year_study\":\"2018-2022\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-29T08:44:29.158287Z\"}', '127.0.0.1', NULL, NULL, '2024-07-29 05:44:29', NULL, NULL, NULL, NULL, NULL, NULL),
(96, 'par_instructor_experience', 'insert', NULL, NULL, '{\"instructor_id\":2,\"experience_name\":\"Software developer\",\"experience_description\":\"Create backend applications\",\"experience_year\":\"2023-2024\",\"created_by\":\"Admin\",\"created_at\":\"2024-07-29T08:47:41.726520Z\"}', '127.0.0.1', NULL, NULL, '2024-07-29 05:47:41', NULL, NULL, NULL, NULL, NULL, NULL),
(97, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66a8ec1317cf7.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66a8ec1319a60.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-07-30T13:35:15.109612Z\"}', '127.0.0.1', NULL, NULL, '2024-07-30 10:35:15', NULL, NULL, NULL, NULL, NULL, NULL),
(98, 'par_course_instructors', 'insert', NULL, NULL, '{\"course_id\":\"61\",\"instructor_id\":\"1\",\"created_by\":null,\"created_at\":\"2024-07-30T13:42:25.040490Z\"}', '127.0.0.1', NULL, NULL, '2024-07-30 10:42:25', NULL, NULL, NULL, NULL, NULL, NULL),
(99, 'par_course_curriculum', 'insert', NULL, NULL, '58', '127.0.0.1', NULL, NULL, '2024-07-30 18:10:54', NULL, NULL, NULL, NULL, NULL, NULL),
(100, 'par_course_curriculum', 'insert', NULL, NULL, '59', '127.0.0.1', NULL, NULL, '2024-07-30 18:11:33', NULL, NULL, NULL, NULL, NULL, NULL),
(101, 'par_course_curriculum', 'insert', NULL, NULL, '60', '127.0.0.1', NULL, NULL, '2024-07-30 18:11:46', NULL, NULL, NULL, NULL, NULL, NULL),
(102, 'par_category_sub_category_mapping', 'update', NULL, 's:200:\"{\"course_category_id\":3,\"course_sub_category_id\":44,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":\"Admin\",\"updated_at\":\"2023-12-05 11:04:37\",\"altered_by\":null,\"altered_at\":null}\";', 's:197:\"{\"course_category_id\":3,\"course_sub_category_id\":44,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:51:08\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 09:51:08', NULL, NULL, NULL, NULL, NULL, NULL),
(103, 'par_category_sub_category_mapping', 'update', NULL, 's:197:\"{\"course_category_id\":3,\"course_sub_category_id\":44,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:51:08\",\"altered_by\":null,\"altered_at\":null}\";', 's:4:\"null\";', '127.0.0.1', NULL, NULL, '2024-08-03 09:51:17', NULL, NULL, NULL, NULL, NULL, NULL),
(104, 'par_category_sub_category_mapping', 'update', NULL, 's:200:\"{\"course_category_id\":4,\"course_sub_category_id\":43,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":\"Admin\",\"updated_at\":\"2023-12-05 11:04:37\",\"altered_by\":null,\"altered_at\":null}\";', 's:4:\"null\";', '127.0.0.1', NULL, NULL, '2024-08-03 09:52:42', NULL, NULL, NULL, NULL, NULL, NULL),
(105, 'par_category_sub_category_mapping', 'update', NULL, 's:197:\"{\"course_category_id\":1,\"course_sub_category_id\":43,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:52:42\",\"altered_by\":null,\"altered_at\":null}\";', 's:197:\"{\"course_category_id\":1,\"course_sub_category_id\":43,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:53:34\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 09:53:34', NULL, NULL, NULL, NULL, NULL, NULL),
(106, 'par_category_sub_category_mapping', 'update', NULL, 's:197:\"{\"course_category_id\":1,\"course_sub_category_id\":43,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:53:34\",\"altered_by\":null,\"altered_at\":null}\";', 's:197:\"{\"course_category_id\":1,\"course_sub_category_id\":43,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:53:37\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 09:53:37', NULL, NULL, NULL, NULL, NULL, NULL),
(107, 'par_category_sub_category_mapping', 'delete', NULL, 's:197:\"{\"course_category_id\":1,\"course_sub_category_id\":43,\"created_by\":\"Admin\",\"created_at\":\"2023-11-19 00:24:08\",\"updated_by\":null,\"updated_at\":\"2024-08-03 12:53:37\",\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-08-03 09:57:54', NULL, NULL, NULL, NULL, NULL, NULL),
(108, 'par_category_sub_category_mapping', 'insert', NULL, NULL, '{\"course_category_id\":1,\"course_sub_category_id\":43,\"created_by\":null,\"created_at\":\"2024-08-03T12:58:18.675747Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 09:58:18', NULL, NULL, NULL, NULL, NULL, NULL),
(109, 'par_course_instructors', 'delete', NULL, 's:159:\"{\"course_id\":61,\"instructor_id\":1,\"created_at\":\"2024-07-30 13:42:25\",\"created_by\":null,\"updated_at\":null,\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-08-03 10:08:06', NULL, NULL, NULL, NULL, NULL, NULL),
(110, 'par_course_instructors', 'update', NULL, 's:161:\"{\"course_id\":6,\"instructor_id\":1,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":null,\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', 's:178:\"{\"course_id\":6,\"instructor_id\":2,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":\"2024-08-03 13:13:23\",\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 10:13:23', NULL, NULL, NULL, NULL, NULL, NULL),
(111, 'par_course_instructors', 'update', NULL, 's:178:\"{\"course_id\":6,\"instructor_id\":2,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":\"2024-08-03 13:13:23\",\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', 's:178:\"{\"course_id\":6,\"instructor_id\":1,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":\"2024-08-03 13:14:41\",\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 10:14:41', NULL, NULL, NULL, NULL, NULL, NULL),
(112, 'par_course_instructors', 'update', NULL, 's:178:\"{\"course_id\":6,\"instructor_id\":1,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":\"2024-08-03 13:14:41\",\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', 's:178:\"{\"course_id\":6,\"instructor_id\":1,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":\"2024-08-03 13:17:57\",\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 10:17:57', NULL, NULL, NULL, NULL, NULL, NULL),
(113, 'par_course_instructors', 'delete', NULL, 's:178:\"{\"course_id\":6,\"instructor_id\":1,\"created_at\":\"2023-12-05 14:04:37\",\"created_by\":\"Admin\",\"updated_at\":\"2024-08-03 13:17:57\",\"updated_by\":null,\"altered_at\":null,\"altered_by\":null}\";', NULL, '127.0.0.1', NULL, NULL, '2024-08-03 10:18:50', NULL, NULL, NULL, NULL, NULL, NULL),
(114, 'par_course_instructors', 'insert', NULL, NULL, '{\"course_id\":1,\"instructor_id\":1,\"created_by\":null,\"created_at\":\"2024-08-03T13:19:44.196057Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 10:19:44', NULL, NULL, NULL, NULL, NULL, NULL),
(115, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66ae47227d92c.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66ae472280cec.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-08-03T15:05:06.531854Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 12:05:06', NULL, NULL, NULL, NULL, NULL, NULL),
(116, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66ae474275d8d.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66ae4742766ba.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-08-03T15:05:38.488548Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 12:05:38', NULL, NULL, NULL, NULL, NULL, NULL),
(117, 'par_course_instructors', 'insert', NULL, NULL, '{\"course_id\":6,\"instructor_id\":1,\"created_by\":null,\"created_at\":\"2024-08-03T15:33:19.910305Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 12:33:19', NULL, NULL, NULL, NULL, NULL, NULL),
(118, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sdds\",\"title_bn\":null,\"course_category_id\":\"1\",\"course_sub_category_id\":\"1\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66ae50d636058.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66ae50d6374da.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-08-03T15:46:30.231128Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 12:46:30', NULL, NULL, NULL, NULL, NULL, NULL),
(119, 'par_course_sub_categories', 'insert', NULL, NULL, '58', '127.0.0.1', NULL, NULL, '2024-08-03 17:23:36', NULL, NULL, NULL, NULL, NULL, NULL),
(120, 'par_course_sub_categories', 'insert', NULL, NULL, '59', '127.0.0.1', NULL, NULL, '2024-08-03 17:45:17', NULL, NULL, NULL, NULL, NULL, NULL),
(121, 'par_course_sub_categories', 'update', NULL, 's:282:\"{\"id\":59,\"sub_category_name\":\"sub category two\",\"sub_category_status\":1,\"sub_category_image\":\"uploads\\/courses\\/course-sub-categories\\/66ae96ddbd1c9.jpg\",\"created_by\":\"Admin\",\"created_at\":\"2024-08-03 20:45:17\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', 's:290:\"{\"id\":59,\"sub_category_name\":\"two two\",\"sub_category_status\":1,\"sub_category_image\":\"uploads\\/courses\\/course-sub-categories\\/66ae96ddbd1c9.jpg\",\"created_by\":\"Admin\",\"created_at\":\"2024-08-03 20:45:17\",\"updated_by\":null,\"updated_at\":\"2024-08-03 20:47:03\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 17:47:03', NULL, NULL, NULL, NULL, NULL, NULL),
(122, 'par_courses', 'insert', NULL, NULL, '{\"title_en\":\"sddsjk\",\"title_bn\":null,\"course_category_id\":\"57\",\"course_sub_category_id\":\"58\",\"course_type_id\":\"1\",\"course_difficulty_id\":\"1\",\"course_tag_id\":\"1\",\"price\":\"23\",\"old_price\":\"22\",\"subscription_price\":null,\"start_from\":null,\"duration\":null,\"lesson\":null,\"course_code\":null,\"image\":\"assets\\/uploads\\/courses\\/course-images\\/66ae9abd7f41d.jpg\",\"thumbnail_image\":\"assets\\/uploads\\/courses\\/course-thumbnails-images\\/66ae9abd80297.jpg\",\"thumbnail_video\":null,\"status\":\"1\",\"language\":null,\"created_by\":\"Admin\",\"created_at\":\"2024-08-03T21:01:49.534226Z\"}', '127.0.0.1', NULL, NULL, '2024-08-03 18:01:49', NULL, NULL, NULL, NULL, NULL, NULL),
(123, 'par_progress', 'insert', NULL, NULL, '2', '127.0.0.1', NULL, NULL, '2024-08-03 18:13:26', NULL, NULL, NULL, NULL, NULL, NULL),
(124, 'par_enrollments', 'insert', NULL, NULL, '15', '127.0.0.1', NULL, NULL, '2024-08-03 20:16:26', NULL, NULL, NULL, NULL, NULL, NULL),
(125, 'par_enrollments', 'update', NULL, 's:239:\"{\"id\":15,\"student_id\":257,\"course_id\":6,\"enrollment_date\":\"2024-08-04 02:16:26\",\"start_date\":null,\"end_date\":null,\"created_by\":null,\"created_at\":\"2024-08-03 23:16:26\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', 's:256:\"{\"id\":15,\"student_id\":248,\"course_id\":6,\"enrollment_date\":\"2024-08-04 02:24:10\",\"start_date\":null,\"end_date\":null,\"created_by\":null,\"created_at\":\"2024-08-03 23:16:26\",\"updated_by\":null,\"updated_at\":\"2024-08-03 23:24:10\",\"altered_by\":null,\"altered_at\":null}\";', '127.0.0.1', NULL, NULL, '2024-08-03 20:24:10', NULL, NULL, NULL, NULL, NULL, NULL),
(126, 'par_enrollments', 'insert', NULL, NULL, '18', '127.0.0.1', NULL, NULL, '2024-08-03 20:24:42', NULL, NULL, NULL, NULL, NULL, NULL),
(128, 'par_tags', 'delete', NULL, 's:217:\"{\"id\":18,\"name\":\"uie weweewe hkj\",\"description\":\"the first tags\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 16:46:18\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '18', NULL, '2024-08-16 22:16:04', NULL, NULL, NULL, NULL, NULL, NULL),
(129, 'par_tags', 'delete', NULL, 's:213:\"{\"id\":17,\"name\":\"uie weweewe\",\"description\":\"the first tags\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 12:35:34\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '17', NULL, '2024-08-16 22:16:14', NULL, NULL, NULL, NULL, NULL, NULL),
(130, 'par_tags', 'delete', NULL, 's:211:\"{\"id\":16,\"name\":\"uie wewee\",\"description\":\"the first tags\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-07-18 12:27:51\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '16', NULL, '2024-08-16 22:16:19', NULL, NULL, NULL, NULL, NULL, NULL),
(131, 'par_tags', 'insert', NULL, NULL, '20', '127.0.0.1', NULL, NULL, '2024-08-23 08:03:07', NULL, NULL, NULL, NULL, NULL, NULL),
(132, 'par_tags', 'insert', NULL, NULL, '21', '127.0.0.1', NULL, NULL, '2024-08-23 08:16:49', NULL, NULL, NULL, NULL, NULL, NULL),
(133, 'par_tags', 'insert', NULL, NULL, '22', '127.0.0.1', NULL, NULL, '2024-08-23 08:17:47', NULL, NULL, NULL, NULL, NULL, NULL),
(134, 'par_tags', 'insert', NULL, NULL, '23', '127.0.0.1', NULL, NULL, '2024-08-23 10:57:26', NULL, NULL, NULL, NULL, NULL, NULL),
(135, 'par_tags', 'insert', NULL, NULL, '24', '127.0.0.1', NULL, NULL, '2024-08-23 10:59:01', NULL, NULL, NULL, NULL, NULL, NULL),
(136, 'par_tags', 'insert', NULL, NULL, '25', '127.0.0.1', '30', NULL, '2024-08-23 11:34:06', NULL, NULL, NULL, NULL, NULL, NULL),
(137, 'par_tags', 'insert', NULL, NULL, '26', '127.0.0.1', '30', NULL, '2024-08-23 11:34:33', NULL, NULL, NULL, NULL, NULL, NULL),
(138, 'par_tags', 'insert', NULL, NULL, '27', '127.0.0.1', '30', NULL, '2024-08-23 11:47:46', NULL, NULL, NULL, NULL, NULL, NULL),
(139, 'par_tags', 'delete', NULL, 's:209:\"{\"id\":26,\"name\":\"jksjd\",\"description\":\"jksjdkjsldksldsd\",\"code\":null,\"is_enabled\":0,\"created_by\":\"30\",\"created_at\":\"2024-08-23 14:34:33\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '26', NULL, '2024-08-23 12:52:08', NULL, NULL, NULL, NULL, NULL, NULL),
(140, 'par_tags', 'delete', NULL, 's:225:\"{\"id\":25,\"name\":\"My tag with who createdb by jsdlksd\",\"description\":null,\"code\":null,\"is_enabled\":0,\"created_by\":\"30\",\"created_at\":\"2024-08-23 14:34:06\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '25', NULL, '2024-08-23 12:52:22', NULL, NULL, NULL, NULL, NULL, NULL),
(141, 'par_tags', 'delete', NULL, 's:206:\"{\"id\":24,\"name\":\"Okiya\",\"description\":\"Senator Busia\",\"code\":null,\"is_enabled\":0,\"created_by\":null,\"created_at\":\"2024-08-23 13:59:01\",\"updated_by\":null,\"updated_at\":null,\"altered_by\":null,\"altered_at\":null}\";', NULL, '127.0.0.1', '24', NULL, '2024-08-23 12:52:33', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('bR8vb5xBdgl1fvIt', 's:7:\"forever\";', 2039764117),
('unQyuB9mbtatvi7m', 's:7:\"forever\";', 2039763976),
('ZgQIAkY7h7Fo6aSr', 's:7:\"forever\";', 2039687929);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(4, '2019_12_14_000001_create_par_personal_access_tokens_table', 1),
(5, '2023_10_12_031415_create_par_roles_table', 1),
(9, '2023_11_19_053448_create_par_course_categories_table', 2),
(10, '2023_11_22_143059_create_par_permissions_table', 3),
(14, '2023_11_25_034933_create_par_students_table', 4),
(17, '2023_11_26_034558_create_par_courses_table', 5),
(18, '2023_11_26_153556_create_par_enrollments_table', 6),
(20, '2023_11_26_153639_create_par_quizzes_table', 6),
(21, '2023_11_26_153659_create_par_questions_table', 6),
(22, '2023_11_26_153719_create_par_answers_table', 6),
(23, '2023_11_26_153735_create_par_reviews_table', 6),
(25, '2023_11_26_153818_create_par_subscriptions_table', 6),
(27, '2023_11_26_153902_create_par_discussions_table', 6),
(28, '2023_11_26_153916_create_par_messages_table', 6),
(29, '2023_11_26_153660_create_par_options_table', 7),
(30, '2023_12_09_135359_create_par_coupons_table', 8),
(32, '2023_12_09_170943_create_par_checkouts_table', 9),
(33, '2023_11_26_153754_create_par_payments_table', 10),
(34, '2023_11_26_153557_create_par_lessons_table', 11),
(35, '2023_11_26_153620_create_par_materials_table', 12),
(36, '2023_11_26_153844_create_par_progress_table', 12),
(37, '2023_12_20_031354_create_par_watchlists_table', 13),
(38, '2023_12_23_070253_add_tag_to_par_courses_table', 14),
(41, '2023_11_12_031401_create_par_instructors_table', 15),
(42, '2023_11_12_031402_create_par_users_table', 15),
(43, '2024_01_01_121113_add_column_to_user_table', 15),
(44, '2024_01_03_073449_create_par_events_table', 16),
(45, '0001_01_01_000001_create_par_cache_table', 17),
(46, '0001_01_01_000002_create_par_jobs_table', 17),
(47, '2024_07_01_003040_create_par_sessions_table', 17),
(48, '2024_07_16_095220_create_par_api_misaudit_trail_table', 18),
(49, '0001_01_01_000001_create_cache_table', 19),
(50, '0001_01_01_000002_create_jobs_table', 19),
(51, '2024_07_01_003040_create_sessions_table', 19);

-- --------------------------------------------------------

--
-- Table structure for table `par_about_info`
--

CREATE TABLE `par_about_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `about_image_path` varchar(500) DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `who_we_are` varchar(1000) DEFAULT NULL,
  `our_mission` varchar(1000) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_about_info`
--

INSERT INTO `par_about_info` (`id`, `about_image_path`, `title`, `description`, `who_we_are`, `our_mission`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'public/system_partners/65ec396f57d5d.jpg', 'A Great Place To Grow.', 'Vestibulum efficitur accumsan sapien ut lacinia. Sed euismod ullamcorper rhoncus. Phasellus interdum rutrum nisi ut lacinia. Nulla et sapien at turpis viverra. Cras odio ex, posuere id est et, viverra condimentum felis congue quis non odio. Aliquam sem ligula, commodo quis ipsum mattis, lacinia cursus magna.', 'Suspendisse potenti. Pellentesque augue ligula, dictum at pretium eu, fermentum sit amet risus. Maecenas congue feugiat libero, sed euismod urna congue eleifend. Maecenas et gravida felis. Vivamus iaculis tellus sit amet egestas luctus. Phasellus urna eros.', 'Maecenas consectetur ultrices tortor, eget efficitur tortor finibus at. Sed convallis efficitur turpis, eget dapibus magna. Nam euismod lacus ac nulla vehicula aliquam.Curabitur efficitur vehicula sagittis. Cras convallis tellus ac quam efficitur viverra. Maecenas consectetur', 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_address_info`
--

CREATE TABLE `par_address_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `address_icon_id` bigint(20) UNSIGNED DEFAULT NULL,
  `street_address_name` varchar(2000) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_address_info`
--

INSERT INTO `par_address_info` (`id`, `address_icon_id`, `street_address_name`, `city`, `country`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(5, 1, '201, Ronald Ngala', 'Nairobi', 'Kenya', '2', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL),
(8, 1, '201, Moi Avenue', 'Nairobi', 'Kenya', '2', '2024-07-18 12:42:03', NULL, NULL, NULL, NULL),
(9, 1, '201, Kenyatta Avenue', 'Nairobi', 'Kenya', '2', '2024-07-18 16:44:21', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_answers`
--

CREATE TABLE `par_answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `answer` text DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_blogs`
--

CREATE TABLE `par_blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tags_id` bigint(20) UNSIGNED NOT NULL,
  `blog_categories_id` bigint(20) UNSIGNED NOT NULL,
  `blog_status_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `code` varchar(150) DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `blog_image_path` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_blogs`
--

INSERT INTO `par_blogs` (`id`, `tags_id`, `blog_categories_id`, `blog_status_id`, `name`, `description`, `code`, `is_enabled`, `blog_image_path`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 1, 2, 2, 'Wizkid - Ghetto Love (Official Video)', 'Once again Skeete has proven himself as a musical maestro, gracing us with yet another unforgettable composition. While AuthenticViews Dawt Cawm played a significant role in his journey', NULL, 0, 'public/blogs/65f22bb24ac7f.jpg', '2', '2024-02-28 01:19:23', '2', '2024-03-13 22:41:54', NULL, NULL),
(2, 1, 1, 2, 'Wizkid - Expensive Shit', 'I can boldly say every artiste in Nigeria currently was influenced one way or the other by WIZ\" style of Afrobeats', NULL, 0, 'public/blogs/65f22ba493fee.jpg', '2', '2024-02-28 01:34:59', '2', '2024-03-13 22:41:40', NULL, NULL),
(5, 2, 3, 1, 'How to build a website', 'Sadipscing labore amet rebum est et justo gubergren. Et eirmod ipsum sit diam ut magna lorem. Nonumy vero labore lorem sanctus rebum et lorem magna kasd, stet amet magna accusam consetetur eirmod. Kasd accusam sit ipsum sadipscing et at at sanctus et. Ips', NULL, 0, 'public/blogs/65f22b95d1b54.jpg', '2', '2024-03-03 21:20:19', '2', '2024-03-13 22:41:25', NULL, NULL),
(6, 5, 6, 1, 'Chill Afrobeats Summer 2021 Mix (2Hrs)', 'Best of Alte | Afro Soul ft Wizkid, Burna Boy, Gabzy. Enjoy this Summer mix of smooth, relaxing Afrobeats, Alte, Afro Soul Afro RnB jams to help you kick back and chill or even study to.', NULL, 0, 'public/blogs/65f22b82d7bab.jpg', '2', '2024-03-03 21:47:07', '2', '2024-03-13 22:41:06', NULL, NULL),
(7, 5, 6, 1, 'Rema - Charm (Official Music Video)', 'Ravers worldwide thanks for the love. Keep streaming our album ----> https://rema.lnk.to/Rave_RosesUltraSR ❤❤', NULL, 0, 'public/blogs/65f22b73969a4.jpg', '2', '2024-03-03 22:38:54', '2', '2024-03-13 22:40:51', NULL, NULL),
(8, 4, 5, 1, 'DJ Tunez - PAMI (Official Audio) ft. Wizkid, Adekunle Gold, Omah Lay', 'Am a musician (kinda) from Brazil, living in France since 2018 for my studies and since there are many international par_students here, i met many people and made good friends from Nigeria, and they showed me these kinds of songs and i instantly got addicted', NULL, 0, 'public/blogs/65f22b64bd4d2.jpg', '2', '2024-03-03 22:39:53', '2', '2024-03-13 22:40:36', NULL, NULL),
(9, 5, 6, 1, 'Burna Boy - Question feat. Don Jazzy [Official Music Video]', 'LYRICS Don Jazzy again Its Don Jazzy again Its Don Jazzy O Don Jazzy Just for the record, Just for the record. If they like make dem chop all the tomato dem no go ketchup Oya kuro n be yen na Paso o play n’be yen mo o E go do you one kind Ma gbe fun e one', NULL, 0, 'public/blogs/65f22b545f985.jpg', '2', '2024-03-03 22:41:41', '2', '2024-03-14 09:40:19', NULL, NULL),
(10, 5, 6, 2, 'Teni - Uyo Meyo (Official Video)', 'Am a Ghanaian, a year ago i fell in love with this song and later when I found out what it meant I understand why loved it. The meaning and the spirit behind it is what I started doing last year celebrating wins of friends and family because I know one d', NULL, 0, 'public/blogs/665f439203fda.jpg', '2', '2024-03-03 22:42:51', NULL, '2024-06-04 16:40:50', NULL, NULL),
(14, 3, 2, 1, 'one', 'one', NULL, 0, NULL, '2', '2024-06-30 14:38:05', '2', NULL, NULL, NULL),
(17, 4, 4, 1, 'Kenya\'s president says he won\'t sign tax bill that sparked deadly protests', '<p>‘I concede’ said William Ruto following protests that left at least 23 people dead and many more woundedKenya&#39;s president William Ruto says he won&#39;t sign the finance bill that led protesters to storm the nation’s parliament in anger over rising costs.At least five people were shot deadas protesters stormed the building in chaotic scenes in the capital Nairobi on Tuesday.</p><p><br></p><p>A fire erupted in the parliament building while thousands protested on the streets outside, including Barack Obama’s half-sister Auma Obama, who was teargassed on live television.The government wanted to raise funds to pay off debt. Kenyans said the bill caused economic pain as millions struggle to get by.&quot;Listening keenly to the people of Kenya who have said loudly that they want nothing to do with this finance bill 2024, I concede,” Mr Ruto said in a televised address on Wednesday.</p><p><br></p><p>“And therefore, I will not sign the 2024 finance bill, and it shall subsequently be withdrawn.”The president said he would now start a dialogue with Kenyan youth, without going into details, and work on austerity measures - starting with cuts to the budget of the presidency - to make up the difference in the country&#39;s finances.</p><p><br></p><p>The move will be seen as a major victory for a week-old protest movement that grew from online condemnations of tax increases into mass rallies demanding a political overhaul, in the most serious crisis of Mr Ruto&#39;s two-year-old presidency.On Tuesday, police opened fire on crowds who massed around parliament and later broke into the assembly&#39;s compound, minutes after lawmakers had voted through the tax measures and sent them on to the president.</p><p><br></p><p>The chaos on Tuesday led Kenya&#39;s government to deploy the military and Mr Ruto called protesters&#39; actions “treasonous”.It was the biggest assault on Kenya&#39;s government in decades.At least 23 people were killed across the East African country and another 30 were being treated for bullet wounds, the Kenya Medical Association said on Wednesday. Medical officials in Nairobi said scores had been injured.Heavily armed police patrolled the streets of the capital Nairobi, which were quieter than usual on Wednesday.</p>', NULL, 0, NULL, '2', '2024-06-30 17:46:24', NULL, '2024-06-30 22:33:47', NULL, NULL),
(18, 4, 6, 1, 'Kenya\"s president has withdrawn the controversial tax bill after deadly protests', '<p>NAIROBI, Kenya — Kenyan President William Ruto says he will not sign into law a controversial tax bill that has sparked widespread protests across the country, but activists said demonstrations will continue.More than 20 people died in the protests Tuesday, according to the Kenya Human Rights Commission, which said some were shot by police. Protesters stormed into and set fire to parts of the nation&#39;s parliament buildings.&quot;Listening keenly to the people of Kenya who have said loudly that they want nothing to do with this finance bill 2024, I concede, and therefore I will not sign the 2024 finance bill and it shall subsequently be withdrawn,&quot; Ruto said in a national address on Wednesday.He acknowledged the country has &quot;witnessed widespread expression of dissatisfaction&quot; over Tuesday&#39;s vote in parliament, where lawmakers approved the bill, and he expressed regret at the loss of life and destruction of property during the protests.The president said his government would instead widen austerity measures, including cuts in hospitality and travel expenses for his office. He has sent the bill back to parliament for amendments.But protesters have vowed to march on Thursday across the country to call for the resignation of the president and all members of parliament who voted for the bill this week.This comes as human rights bodies announced a rise in the death toll after Tuesday’s deadly protests outside parliament. The Kenya Human Rights Commission issued a statement condemning the response by police, who have been accused of using heavy-handed tactics during these protests, including live rounds on crowds, beatings and even abductions.The incidents have also shone a spotlight on the Kenyan police who have been criticized for their tactics in the past.The protests are the biggest challenge yet for Ruto, who demonstrators say has failed to improve the lives of millions of young people who voted for him two years ago.Abroad, the unrest and the police response have created some awkward optics at a time when the first contingent of hundreds of Kenyan police officers arrived in Haiti to lead a United Nations-backed force to help restore peace in that Caribbean country.The contingent now in Haiti comes from the General Service Unit, which is the same paramilitary group that was overwhelmed by protesters in Kenya on Tuesday.It’s a big headache for Ruto, who has styled himself as a strong ally of the West but domestically faces serious par_questions over his handling of the protests.Most of the protesters are young people, college par_students calling themselves the &quot;Gen Z,&quot; who galvanized much of the opposition to finance bill 2024 on social media.The legislation sought to raise about $2.9 billion in taxes that the government said it needed to pay off huge foreign debt.But the protesters said that the taxes would make life much harder, raising the cost of such things as cooking oil, sanitary pads and diapers, as well as fuel taxes that would make transportation and production more expensive.</p>', NULL, 0, NULL, '2', '2024-06-30 18:12:30', NULL, '2024-07-01 09:06:41', NULL, NULL),
(22, 4, 5, 1, 'qwqq', '<p>qwqq sdsd</p>', NULL, 0, 'assets/uploads/blogs-posts/6682088728333.jpg', '2', '2024-07-01 01:38:15', '2', NULL, NULL, NULL),
(24, 1, 1, 1, 'Rexxie and Zinoleesky', '<p>5,483,242 views Dec 11, 2022Rexxie and Zinoleesky present the Official Video to NO MORE CONDITION. Available to stream / download: http://africori.to/nomorecondition © 20 22 HitxlabNG / Dvpper Music</p>', NULL, 0, 'assets/uploads/blogs-posts/66824e10a1706.jpg', '2', '2024-07-01 06:34:56', '2', NULL, NULL, NULL),
(25, 4, 3, 1, 'Reekado Banks - Rora (Official Video)', '<p><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: var(--yt-formatted-string-bold-color,inherit); background-color: transparent;\">29,608,040 views Premiered Oct 11, 2019 </span><a href=\"https://www.youtube.com/hashtag/rora\" rel=\"noopener noreferrer\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: var(--yt-endpoint-color,var(--yt-spec-call-to-action)); background-color: transparent;\">#rora</a><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: var(--yt-formatted-string-bold-color,inherit); background-color: transparent;\"> </span><a href=\"https://www.youtube.com/hashtag/reekadobanks\" rel=\"noopener noreferrer\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: var(--yt-endpoint-color,var(--yt-spec-call-to-action)); background-color: transparent;\">#reekadobanks</a><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: var(--yt-formatted-string-bold-color,inherit); background-color: transparent;\"> </span><a href=\"https://www.youtube.com/hashtag/officialvideo\" rel=\"noopener noreferrer\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: var(--yt-endpoint-color,var(--yt-spec-call-to-action)); background-color: transparent;\">#officialvideo</a></p><p><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: rgb(19, 19, 19); background-color: transparent;\">Watch the Official Music Video for Reekado Banks Hit Single &quot;Rora&quot;, performed by Reekado Banks , Produced by Tuzi and Altims. Video was shot in Los Angeles and Directed by Dalia Dias. Nigerian singer, Reekado Banks offers an infectious neo-afropop record dubbed Rora (translated from Yoruba as Gently). The bob which embodies ancient African highlife rhythms finds the singer falling head over heels for a love interest which he describes as a complete package. Rora comes just after Reekado Banks’ month-long solo tour in the United States, and is the first single from his upcoming album. Rora is also available on Apple Music , Spotify , Youtube Music, Deezer, Boomplay Music, uduX, Audiomack, Soundcloud and world wide platforms . Click link below </span><a href=\"https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbTdLMV9UejJPdFAtbEtyaS1ReDhEckR4SHloQXxBQ3Jtc0ttSTBTVkpxNE55YXIyRzdtZjFSbDlWejd4eWN0aFFrdXF1VUczeldEMVlYU2Nwam02bDVPY1RWam8wQzBMZkhVZUo0dWwtRVJRRU1GTEczMjhFX1MwNkMtVzFlaDBNT2lPbmEtTHhDUnVNeGVNelFaSQ&amp;q=https%3A%2F%2Freekadobanks.ffm.to%2Frora.oyd&amp;v=OC93pNSrRP8\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: inherit; background-color: transparent;\">https://reekadobanks.ffm.to/rora.oyd</a><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: rgb(19, 19, 19); background-color: transparent;\"> Curated and distributed by MAD SOLUTIONS </span><a href=\"https://www.youtube.com/hashtag/reekadobanks\" rel=\"noopener noreferrer\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: inherit; background-color: transparent;\">#reekadobanks</a><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: rgb(19, 19, 19); background-color: transparent;\"> </span><a href=\"https://www.youtube.com/hashtag/rora\" rel=\"noopener noreferrer\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: inherit; background-color: transparent;\">#rora</a><span style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: rgb(19, 19, 19); background-color: transparent;\"> </span><a href=\"https://www.youtube.com/hashtag/officialvideo\" rel=\"noopener noreferrer\" style=\"font-size: 14px; font-family: Roboto, Arial, sans-serif; color: inherit; background-color: transparent;\">#officialvideo</a></p>', NULL, 0, 'assets/uploads/blogs-posts/66824f3d3603f.jpg', '2', '2024-07-01 06:39:57', '2', NULL, NULL, NULL),
(26, 3, 2, 1, 'new blog one', 'new blog', NULL, 0, 'assets/uploads/blogs-posts/669953abcd199.jpg', NULL, '2024-07-18 17:40:59', NULL, NULL, NULL, NULL),
(27, 3, 2, 1, 'new blog two', 'new blog', NULL, 0, 'assets/uploads/blogs-posts/669954b783d4b.jpg', NULL, '2024-07-18 17:45:27', NULL, NULL, NULL, NULL),
(28, 3, 1, 11, 'chapter three', NULL, NULL, 0, 'views/dev_portal/buffalofrontend/src/assets/uploads/blogs-posts/669959f185c32.jpg', NULL, '2024-07-18 18:07:45', NULL, '2024-07-18 20:27:25', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_blog_categories`
--

CREATE TABLE `par_blog_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(150) DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_blog_categories`
--

INSERT INTO `par_blog_categories` (`id`, `name`, `description`, `code`, `is_enabled`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Data Cleaning', 'Data preparation', NULL, 0, '2', '2024-02-28 00:51:41', NULL, NULL, NULL, NULL),
(2, 'Data Manipulation', 'Data preparation', NULL, 0, '2', '2024-02-28 00:51:57', NULL, NULL, NULL, NULL),
(3, 'Web Design', 'Web Design', NULL, 0, '2', '2024-03-03 20:32:56', NULL, NULL, NULL, NULL),
(4, 'Web Development', 'Web Development', NULL, 0, '2', '2024-03-03 20:33:06', NULL, NULL, NULL, NULL),
(5, 'Keyword Research', 'Keyword Research', NULL, 0, '2', '2024-03-03 20:33:19', NULL, NULL, NULL, NULL),
(6, 'Email Marketing', 'Email Marketing', NULL, 0, '2', '2024-03-03 20:33:30', NULL, NULL, NULL, NULL),
(7, 'Data engineering', 'Data center concept.', NULL, 0, NULL, '2024-07-04 07:57:02', NULL, NULL, NULL, NULL),
(8, 'Blockchain app development', 'Develeopment of app contracts.', NULL, 0, NULL, '2024-07-04 07:59:38', NULL, '2024-07-04 08:00:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_blog_status`
--

CREATE TABLE `par_blog_status` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(150) DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_blog_status`
--

INSERT INTO `par_blog_status` (`id`, `name`, `description`, `code`, `is_enabled`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Publish', 'Ready to be made to the public', NULL, 0, '2', '2024-02-28 00:51:07', NULL, NULL, NULL, NULL),
(2, 'Draft', 'Not ready to be made to the public - requires some editing.', NULL, 0, '2', '2024-06-30 14:31:03', NULL, NULL, NULL, NULL),
(11, 'sdsds', 'jsdk', NULL, 0, NULL, '2024-07-18 16:59:25', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_cache`
--

CREATE TABLE `par_cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_cache_locks`
--

CREATE TABLE `par_cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_on` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_category_sub_category_mapping`
--

CREATE TABLE `par_category_sub_category_mapping` (
  `course_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_sub_category_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_category_sub_category_mapping`
--

INSERT INTO `par_category_sub_category_mapping` (`course_category_id`, `course_sub_category_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(1, 2, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(2, 3, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(3, 4, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(1, 37, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(1, 38, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(1, 39, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(2, 40, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(2, 41, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(4, 42, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(1, 43, NULL, '2024-08-03 12:58:18', NULL, NULL, NULL, NULL),
(1, 44, 'Admin', '2023-11-19 00:24:08', NULL, '2024-08-03 12:51:17', NULL, NULL),
(4, 45, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(4, 46, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(4, 47, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(4, 48, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(57, 58, 'Admin', '2024-08-03 21:01:49', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_checkouts`
--

CREATE TABLE `par_checkouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_data` longtext NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `txnid` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 active, 0 inactive',
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_checkouts`
--

INSERT INTO `par_checkouts` (`id`, `cart_data`, `student_id`, `txnid`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(18, 'eyJjYXJ0Ijp7IjYiOnsidGl0bGVfZW4iOiJGdWxsLVN0YWNrIFdlYiBEZXZlbG9wbWVudCBCb290Y2FtcDogQmFzaWNzIHRvIEFkdmFuY2VkIiwicXVhbnRpdHkiOjEsInByaWNlIjoiNTAwMC4wMCIsIm9sZF9wcmljZSI6IjkwMDAuMDAiLCJpbWFnZSI6IjE0MDE3MDQxMjY5NzIuanBnIiwiZGlmZmljdWx0eSI6ImJlZ2lubmVyIiwiaW5zdHJ1Y3RvciI6IkJ1cmhhbiBVZGRpbiBGdWFkIn19LCJjYXJ0X2RldGFpbHMiOnsiY2FydF90b3RhbCI6NTAwMCwiY291cG9uX2NvZGUiOiJvZmZlcjIwIiwiZGlzY291bnQiOiIyMC4wMCIsImRpc2NvdW50X2Ftb3VudCI6MTAwMCwidGF4Ijo2MDAsInRvdGFsX2Ftb3VudCI6NDYwMH19', 220, 'SSLCZ_TXN_6592f9adf2b79', 1, 'Admin', '2024-01-01 11:43:09', 'Admin', '2024-01-01 11:43:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_company_branches`
--

CREATE TABLE `par_company_branches` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(220) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `initial` varchar(100) DEFAULT NULL,
  `branch_icon_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_company_branches`
--

INSERT INTO `par_company_branches` (`id`, `name`, `description`, `initial`, `branch_icon_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Nairobi', 'Where our main branch operates', 'NA', 14, 'Admin', '2024-03-14 10:00:48', NULL, '2024-07-16 10:46:15', NULL, NULL),
(2, 'Mombasa', 'Where our second highest branch operates', 'MO', 14, 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL),
(3, 'Kisumu', 'Where our third highest branch operates', 'KI', 14, 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_company_branch_info`
--

CREATE TABLE `par_company_branch_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contact_image_path` varchar(500) DEFAULT NULL,
  `title` varchar(220) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_company_branch_info`
--

INSERT INTO `par_company_branch_info` (`id`, `contact_image_path`, `title`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'public/system_partners/65ec396f57d5d.jpg', 'Our branches', 'The Buffalo Academy company Branch description about the listed branches', 'Admin', '2024-03-14 10:00:48', NULL, '2024-07-16 10:22:58', NULL, NULL),
(10, 'public/system_partners/65ec396f57d5d.jpg', 'All branches', 'The Buffalo Academy company Branch description about the listed branches', 'Admin', '2024-07-16 10:23:19', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_contact`
--

CREATE TABLE `par_contact` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `message` varchar(150) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_contact`
--

INSERT INTO `par_contact` (`id`, `name`, `email`, `subject`, `message`, `created_by`, `created_at`, `altered_by`, `altered_at`, `updated_by`, `updated_at`) VALUES
(2, 'ben', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', '1', '2024-03-09 12:13:01', NULL, NULL, '1', '2024-03-09 12:18:42'),
(4, 'benSDSSDSD', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', '1', '2024-07-19 08:53:03', NULL, NULL, NULL, NULL),
(5, 'be', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', '1', '2024-07-19 08:53:15', NULL, NULL, NULL, NULL),
(6, 'bye', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', NULL, '2024-07-19 09:46:49', NULL, NULL, NULL, NULL),
(7, 'hds', 'sdsd@gmail.com', 'wowe', 'wlkwle', NULL, '2024-07-19 09:47:28', NULL, NULL, NULL, NULL),
(8, 'jkdj', 'wwe@gmail.com', 'sdsd', 'skdlsd', NULL, '2024-07-19 09:48:23', NULL, NULL, NULL, NULL),
(9, 'kwe', 'wew@gmail.com', 'klwkw', 'klwe', NULL, '2024-07-19 09:49:26', NULL, NULL, NULL, NULL),
(10, 'jksd', 'kjsdj@gmail.com', 'lskd', 'okpo', NULL, '2024-07-19 09:50:15', NULL, NULL, NULL, NULL),
(11, 'qw', 'kjsd@gmail.com', 'kjsd', 'jksd sdkjklksd', NULL, '2024-07-19 09:52:21', NULL, NULL, NULL, NULL),
(12, 'kjsd', 'kjdj@gmail.com', 'lkksd lksd', 'sdklkw', NULL, '2024-07-19 09:56:22', NULL, NULL, NULL, NULL),
(13, 'wewe', 'we@gmail.com', 'kjwe', 'kjwe', NULL, '2024-07-19 09:56:44', NULL, NULL, NULL, NULL),
(14, 'ksj', 'akjs@gmail.com', 'skjsd', 'kewwe', NULL, '2024-07-19 09:59:10', NULL, NULL, NULL, NULL),
(15, 'kwj', 'qweqw@gmail.com', 'lkdwe', 'lweklwe', NULL, '2024-07-19 09:59:55', NULL, NULL, NULL, NULL),
(16, 'kjwe', 'wewewe@gmail.com', 'jkwe', 'kjwe', NULL, '2024-07-19 10:01:06', NULL, NULL, NULL, NULL),
(17, 'kjdf', 'wkje@gmail.com', 'kjwew', 'klk', NULL, '2024-07-19 10:02:06', NULL, NULL, NULL, NULL),
(18, 'byeeer', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', NULL, '2024-07-19 11:20:41', NULL, NULL, NULL, NULL),
(19, 'bien', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', NULL, '2024-07-19 11:23:44', NULL, NULL, NULL, NULL),
(20, 'bieny', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', NULL, '2024-07-19 11:59:41', NULL, NULL, NULL, NULL),
(21, 'bienyw', 'omusi.ben@gmail.com', 'Data science', 'Machine Learning modelling', NULL, '2024-07-19 12:07:00', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_contact_info`
--

CREATE TABLE `par_contact_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `phone_icon_id` bigint(20) UNSIGNED NOT NULL,
  `company_phone_number` varchar(100) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_contact_info`
--

INSERT INTO `par_contact_info` (`id`, `phone_icon_id`, `company_phone_number`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 2, '+254 112 937557', 'Admin', '2024-03-5 10:15', '2', '2024-03-14 09:54:34', NULL, NULL),
(4, 2, '1211212762', '1', '2024-03-09 15:43:35', '2', '2024-07-16 11:18:06', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_coupons`
--

CREATE TABLE `par_coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount` decimal(8,2) NOT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_until` date DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_coupons`
--

INSERT INTO `par_coupons` (`id`, `code`, `discount`, `valid_from`, `valid_until`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'offer20', 20.00, '2023-12-09', '2024-03-26', 'Admin', '2023-12-09 09:30:32', 'Admin', '2023-12-09 09:30:32', NULL, NULL),
(2, 'el50', 50.00, '2023-12-09', '2024-12-16', 'Admin', '2023-12-09 09:34:18', 'Admin', '2023-12-09 09:34:18', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_courses`
--

CREATE TABLE `par_courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `title_bn` varchar(255) DEFAULT NULL,
  `course_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_sub_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_type_id` bigint(20) UNSIGNED NOT NULL,
  `course_difficulty_id` bigint(20) UNSIGNED NOT NULL,
  `course_tag_id` bigint(20) UNSIGNED NOT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `old_price` decimal(10,2) DEFAULT NULL,
  `subscription_price` decimal(10,2) DEFAULT NULL,
  `start_from` timestamp NULL DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `lesson` int(11) DEFAULT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `thumbnail_image` varchar(255) DEFAULT NULL,
  `thumbnail_video` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0 pending, 1 inactive, 2 active',
  `language` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_courses`
--

INSERT INTO `par_courses` (`id`, `title_en`, `title_bn`, `course_category_id`, `course_sub_category_id`, `course_type_id`, `course_difficulty_id`, `course_tag_id`, `price`, `old_price`, `subscription_price`, `start_from`, `duration`, `lesson`, `course_code`, `image`, `thumbnail_image`, `thumbnail_video`, `status`, `language`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Introduction to Graphic Design', 'Learn the basics of graphic design', 1, 1, 1, 1, 1, 50.00, 30.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/1401704126972.jpg', 'assets/uploads/courses/thumbnails/1401704126972.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:25:29', 'Admin', '2024-01-09 09:50:25', NULL, NULL),
(2, 'Web Development for Beginners', 'Start your journey into web development', 2, 3, 1, 1, 1, 40.00, 25.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/3081704127060.jpg', 'assets/uploads/courses/thumbnails/7251704127060.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:27:30', 'Admin', '2024-01-09 09:45:25', NULL, NULL),
(3, 'Advanced Web Design', 'Deep dive into advanced web design techniques', 1, 2, 2, 2, 1, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/4391704127093.jpg', 'assets/uploads/courses/thumbnails/3651704127093.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:30:35', 'Admin', '2024-01-09 09:40:25', NULL, NULL),
(4, 'Digital Marketing Essentials', 'Learn essential digital marketing skills', 3, 4, 2, 3, 1, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/6621704127113.jpg', 'assets/uploads/courses/thumbnails/4891704127113.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:32:45', 'Admin', '2024-01-09 09:35:25', NULL, NULL),
(5, 'Database Design & Development', 'Comprehensive course on database design and development', 4, 42, 1, 1, 2, 100.00, 80.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/9481704127131.jpg', 'assets/uploads/courses/thumbnails/4111704127131.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:34:10', 'Admin', '2024-01-09 09:30:25', NULL, NULL),
(6, 'Full-Stack Web Development Bootcamp: Basics to Advanced', 'Full-Stack Web Development Bootcamp: From Basic to Advanced', 2, 3, 1, 1, 1, 50.00, 90.00, NULL, NULL, 3, 35, NULL, 'assets/uploads/courses/1401704126972.jpg', 'assets/uploads/courses/thumbnails/8191704126972.jpg', 'https://www.youtube.com/watch?v=Xe_G6Cx7yTM', 2, 'en', 'Admin', '2023-11-26 03:30:17', 'Admin', '2024-01-09 09:15:25', NULL, NULL),
(7, 'Adobe Creative Suite Mastery: Photoshop, Illustrator, InDesign', 'Adobe Creative Suite Mastery: Photoshop, Illustrator, InDesign', 1, 1, 2, 1, 2, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/4091704127086.jpg', 'assets/uploads/courses/thumbnails/3521704127086.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:32:44', 'Admin', '2024-01-09 07:49:25', NULL, NULL),
(8, 'Search Engine Optimization (SEO): Boosting Website Visibility', 'Search engine optimization (SEO): Increase website visibility', 1, 1, 1, 1, 2, 30.00, NULL, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/6891704127114.jpg', 'assets/uploads/courses/thumbnails/8491704127114.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:34:25', 'Admin', '2024-01-09 09:19:39', NULL, NULL),
(9, '3D Animation Basics: Getting Started with Blender', '3D Animation Basics: Getting Started with Blender', 4, 39, 2, 2, 1, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/6781704127193.jpg', 'assets/uploads/courses/thumbnails/7821704127193.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:37:43', 'Admin', '2024-01-09 09:20:01', NULL, NULL),
(10, 'React.js Fundamentals: Building Modern User Interfaces', 'React.js Fundamentals: Building Modern User Interfaces', 2, 3, 1, 2, 2, 12.00, 15.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/4341704127229.jpg', 'assets/uploads/courses/thumbnails/6681704127229.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:39:29', 'Admin', '2024-01-09 09:29:35', NULL, NULL),
(11, 'Data Science with Python: A Hands-on Approach', 'Data Science with Python: A Hands-on Approach', 5, 43, 1, 2, 3, 75.00, 150.00, NULL, NULL, 6, 50, NULL, 'assets/uploads/courses/data_science_with_python.jpg', 'assets/uploads/courses/thumbnails/thumb_data_science_with_python.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 00:41:45', 'Admin', '2024-01-09 06:30:10', NULL, NULL),
(12, 'Graphic Design: From Basics to Advanced Techniques', 'Graphic Design: From Basics to Advanced Techniques', 1, 1, 2, 1, 1, 0.00, 0.00, NULL, NULL, 4, 30, NULL, 'assets/uploads/courses/graphic_design.jpg', 'assets/uploads/courses/thumbnails/thumb_graphic_design.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 00:43:15', 'Admin', '2024-01-09 06:30:50', NULL, NULL),
(13, 'Cybersecurity Fundamentals', 'Cybersecurity Fundamentals', 4, 47, 1, 1, 2, 60.00, 100.00, NULL, NULL, 5, 25, NULL, 'assets/uploads/courses/cybersecurity.jpg', 'assets/uploads/courses/thumbnails/thumb_cybersecurity.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 00:44:30', 'Admin', '2024-01-09 06:31:20', NULL, NULL),
(14, 'Advanced Machine Learning Techniques', 'Advanced Machine Learning Techniques', 5, 43, 1, 3, 3, 120.00, 200.00, NULL, NULL, 8, 45, NULL, 'assets/uploads/courses/advanced_ml.jpg', 'assets/uploads/courses/thumbnails/thumb_advanced_ml.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 00:45:50', 'Admin', '2024-01-09 06:31:50', NULL, NULL),
(15, 'Game Development with Unity', 'Game Development with Unity', 4, 41, 1, 2, 4, 80.00, 120.00, NULL, NULL, 6, 40, NULL, 'assets/uploads/courses/game_development_unity.jpg', 'assets/uploads/courses/thumbnails/thumb_game_development_unity.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 00:47:00', 'Admin', '2024-01-09 06:32:20', NULL, NULL),
(18, 'Entrepreneurship Fundamentals', 'Learn the basics of entrepreneurship', 3, 44, 2, 3, 2, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/5211704127164.jpg', 'assets/uploads/courses/thumbnails/1091704127164.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:33:55', 'Admin', '2024-01-09 08:00:25', NULL, NULL),
(19, 'Learn Python Programming from Scratch', 'Learn Python programming from scratch', 4, 43, 1, 1, 2, 20.00, 35.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/4641704127141.jpg', 'assets/uploads/courses/thumbnails/7911704127141.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:35:20', 'Admin', '2024-01-09 09:13:25', NULL, NULL),
(61, 'sdds', NULL, 1, 1, 1, 1, 1, 23.00, 22.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/course-images/66a8ec1317cf7.jpg', 'assets/uploads/courses/course-thumbnails-images/66a8ec1319a60.jpg', NULL, 1, NULL, 'Admin', '2024-07-30 13:35:15', NULL, NULL, NULL, NULL),
(67, '2D Animation for Beginners', 'Learn 2D animation from scratch', 1, 38, 2, 2, 2, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/9781704127145.jpg', 'assets/uploads/courses/thumbnails/2151704127145.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:34:55', 'Admin', '2024-01-09 09:25:25', NULL, NULL),
(77, 'Introduction to Game Development', 'Basics of game development for beginners', 2, 41, 2, 2, 2, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/3991704127157.jpg', 'assets/uploads/courses/thumbnails/2581704127157.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:36:20', 'Admin', '2024-01-09 09:20:25', NULL, NULL),
(110, 'Advanced Excel for Data Analysis and Reporting', 'Advanced Excel for Data Analysis and Reporting', 5, 43, 1, 2, 2, 30.00, 50.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/8691704127172.jpg', 'assets/uploads/courses/thumbnails/9981704127172.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:36:30', 'Admin', '2024-01-09 09:10:25', NULL, NULL),
(111, 'Mobile App Development with Flutter and Dart', 'Mobile Application Development with Flutter and Dart', 2, 40, 2, 2, 2, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/6911704127201.jpg', 'assets/uploads/courses/thumbnails/7411704127201.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:37:14', 'Admin', '2024-01-09 09:08:25', NULL, NULL),
(112, 'Project Management Professional (PMP) Certification Training', 'Project Management Professional (PMP) certification training', 3, 44, 2, 3, 2, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/8681704127229.jpg', 'assets/uploads/courses/thumbnails/8431704127229.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:38:19', 'Admin', '2024-01-09 09:05:25', NULL, NULL),
(113, 'Ethical Hacking and Cybersecurity Fundamentals', 'Ethical hacking and cyber security basics', 4, 47, 1, 3, 2, 40.00, 70.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/3871704127255.jpg', 'assets/uploads/courses/thumbnails/8271704127255.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:39:14', 'Admin', '2024-01-09 09:03:25', NULL, NULL),
(114, 'Data Analysis with R and Python', 'Data Analysis with R and Python', 5, 43, 1, 2, 2, 50.00, 70.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/9981704127270.jpg', 'assets/uploads/courses/thumbnails/1531704127270.jpg', 'https://www.youtube.com/watch?v=lw6IVgb-omg', 2, 'en', 'Admin', '2023-11-26 03:40:00', 'Admin', '2024-01-09 09:01:25', NULL, NULL),
(118, 'sddsjk', NULL, 57, 58, 1, 1, 1, 23.00, 22.00, NULL, NULL, NULL, NULL, NULL, 'assets/uploads/courses/course-images/66ae9abd7f41d.jpg', 'assets/uploads/courses/course-thumbnails-images/66ae9abd80297.jpg', NULL, 1, NULL, 'Admin', '2024-08-03 21:01:49', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_categories`
--

CREATE TABLE `par_course_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>active 2=>inactive',
  `category_image` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_categories`
--

INSERT INTO `par_course_categories` (`id`, `category_name`, `category_status`, `category_image`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Design', 1, '3241701795877.jpg', 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(2, 'Development', 1, '1601701795901.jpg', 'Admin', '2023-11-19 01:23:53', 'Admin', '2023-12-05 11:05:01', NULL, NULL),
(3, 'Business', 1, '4441701795922.jpg', 'Admin', '2023-11-19 01:24:44', 'Admin', '2023-12-05 11:05:22', NULL, NULL),
(4, 'IT & Software', 1, '4441701795922.jpg', 'Admin', '2023-11-19 01:24:44', 'Admin', '2023-12-05 11:05:22', NULL, NULL),
(5, 'Data Analysis', 1, '9691701795938.jpg', 'Admin', '2023-11-19 21:20:48', 'Admin', '2023-12-05 11:05:38', NULL, NULL),
(57, 'blog category one', 1, 'uploads/courses/course-categories/66a138fcc4f03.jpg', 'Admin', '2024-07-24 17:25:16', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_curriculum`
--

CREATE TABLE `par_course_curriculum` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_curriculum`
--

INSERT INTO `par_course_curriculum` (`id`, `course_id`, `name`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(58, 6, 'Get Started', NULL, NULL, '2024-07-30 21:10:54', NULL, NULL, NULL, NULL),
(59, 6, 'The Project Brief', NULL, NULL, '2024-07-30 21:11:33', NULL, NULL, NULL, NULL),
(60, 6, 'Low Fidelity Wireframes', NULL, NULL, '2024-07-30 21:11:46', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_difficulty`
--

CREATE TABLE `par_course_difficulty` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>active 2=>inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_difficulty`
--

INSERT INTO `par_course_difficulty` (`id`, `name`, `description`, `status`, `created_at`, `created_by`, `updated_at`, `updated_by`, `altered_at`, `altered_by`) VALUES
(1, 'Beginner', 'Beginner', 1, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(2, 'Internediate', 'Internediate', 1, '2023-12-05 11:05:01', 'Admin', NULL, NULL, NULL, NULL),
(3, 'Advanced', 'Advanced', 1, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(4, 'Expert', 'Expert', 1, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_instructors`
--

CREATE TABLE `par_course_instructors` (
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `instructor_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_instructors`
--

INSERT INTO `par_course_instructors` (`course_id`, `instructor_id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `altered_at`, `altered_by`) VALUES
(1, 1, '2024-08-03 10:19:44', NULL, NULL, NULL, NULL, NULL),
(6, 1, '2024-08-03 12:33:19', NULL, NULL, NULL, NULL, NULL),
(7, 3, '2023-12-05 11:05:01', 'Admin', NULL, NULL, NULL, NULL),
(8, 4, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(9, 2, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(10, 5, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_overview`
--

CREATE TABLE `par_course_overview` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `description_en` varchar(255) NOT NULL,
  `prerequisites_en` text DEFAULT NULL,
  `who_this_course_is_for` text DEFAULT NULL,
  `what_you_will_be_learn` text DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_overview`
--

INSERT INTO `par_course_overview` (`id`, `course_id`, `description_en`, `prerequisites_en`, `who_this_course_is_for`, `what_you_will_be_learn`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 6, 'Full-Stack Web Development Bootcamp: Basics to Advanced', 'Basic concepts of HTML and CSS; Familiarity with programming concepts is beneficial but not required.', 'Dive into the world of web development with a comprehensive bootcamp covering both front-end and back-end technologies. From HTML and CSS to server-side scripting, this course will equip you with the skills to build dynamic and interactive web applications.', 'Dive into the world of web development with a comprehensive bootcamp covering both front-end and back-end technologies. HTML and CSS From programming to server-side scripting, this course will equip you with the skills to create dynamic and interactive web applications.', 'Admin', '2023-11-26 03:30:17', 'Admin', '2024-01-09 09:15:25', NULL, NULL),
(2, 7, 'Adobe Creative Suite Mastery: Photoshop, Illustrator, InDesign', 'Adobe Creative Suite-Master its powerhouse tools – Photoshop for image editing, Illustrator for vector graphics and layout design InDesign।Learn how to seamlessly integrate these applications to bring your creative visions to life', 'Gain proficiency in Adobe Creative Suite\"s powerhouse tools—Photoshop for image editing, Illustrator for vector graphics, and InDesign for layout design. Learn to seamlessly integrate these applications to bring your creative visions to life.', 'Gain proficiency in Adobe Creative Suite\"s powerhouse tools—Photoshop for image editing, Illustrator for vector graphics, and InDesign for layout design. Learn to seamlessly integrate these applications to bring your creative visions to life.', 'Admin', '2023-11-26 03:32:44', 'Admin', '2024-01-09 07:49:25', NULL, NULL),
(3, 8, 'Search Engine Optimization (SEO): Boosting Website Visibility', 'Search engine optimization (SEO): Increase website visibility', 'Demystify the world of SEO and discover techniques to improve website visibility in search engine results. Learn keyword research, on-page optimization, and off-page strategies to drive organic traffic and enhance online presence.', 'Demystify the world of SEO and discover techniques to improve website visibility in search engine results. Learn keyword research, on-page optimization and off-page strategies to drive organic traffic and increase online presence.', 'Admin', '2023-11-26 03:34:25', 'Admin', '2024-01-09 09:19:39', NULL, NULL),
(4, 9, '3D Animation Basics: Getting Started with Blender', '3D Animation Basics: Getting Started with Blender', 'Delve into the basics of 3D animation using Blender. Learn the fundamentals of modeling, rigging, and animation to bring characters and scenes to life in a three-dimensional space.', 'Using a blender 3D Get into the basics of animation. Learn the fundamentals of modeling, rigging, and animation to bring characters and scenes to life in a three-dimensional space.', 'Admin', '2023-11-26 03:37:43', 'Admin', '2024-01-09 09:20:01', NULL, NULL),
(5, 10, 'React.js Fundamentals: Building Modern User Interfaces', 'React.js Fundamentals: Building Modern User Interfaces', 'Delve into the fundamentals of React.js and discover how to build modern, component-based user interfaces. From state management to routing, this course guides you through React\"s core concepts, enabling you to create powerful and maintainable front-end applications.', 'React.js-Study its basics and how modern, Discover how to build component-oriented user interfaces. From state management to routing, This course guides you through the core concepts of React, enabling you to build robust and maintainable front-end applications.', 'Admin', '2023-11-26 03:39:29', 'Admin', '2024-01-09 09:29:35', NULL, NULL),
(6, 11, 'Data Science with Python: A Hands-on Approach', 'Basic programming knowledge', 'Master data science with Python. This course covers data analysis, visualization, and machine learning using Python libraries like pandas, matplotlib, and scikit-learn.', 'Master data science with Python. This course covers data analysis, visualization, and machine learning using Python libraries like pandas, matplotlib, and scikit-learn.', 'Admin', '2023-11-26 00:41:45', 'Admin', '2024-01-09 06:30:10', NULL, NULL),
(7, 12, 'Graphic Design: From Basics to Advanced Techniques', 'Graphic Design: From Basics to Advanced Techniques', 'Learn graphic design from the ground up. This course covers principles, tools, and techniques to create stunning visuals using Adobe Creative Suite.', 'Learn graphic design from the ground up. This course covers principles, tools, and techniques to create stunning visuals using Adobe Creative Suite.', 'Admin', '2023-11-26 00:43:15', 'Admin', '2024-01-09 06:30:50', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_sub_categories`
--

CREATE TABLE `par_course_sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_category_name` varchar(255) NOT NULL,
  `sub_category_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>active 2=>inactive',
  `sub_category_image` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_sub_categories`
--

INSERT INTO `par_course_sub_categories` (`id`, `sub_category_name`, `sub_category_status`, `sub_category_image`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Graphics Desgin', 1, 'assets/uploads/courseCategories/3241701795877.jpg', 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(2, 'Web Design', 1, 'assets/uploads/courseCategories/1601701795901.jpg', 'Admin', '2023-11-19 01:23:53', 'Admin', '2023-12-05 11:05:01', NULL, NULL),
(3, 'Web Development', 1, 'assets/uploads/courseCategories/4441701795922.jpg', 'Admin', '2023-11-19 01:24:44', 'Admin', '2023-12-05 11:05:22', NULL, NULL),
(4, 'Digital Marketing', 1, 'assets/uploads/courseCategories/9691701795938.jpg', 'Admin', '2023-11-19 21:20:48', 'Admin', '2023-12-05 11:05:38', NULL, NULL),
(37, 'Video Editing', 1, 'assets/uploads/courseCategories/3621701795955.jpg', 'Admin', '2023-11-26 03:36:04', 'Admin', '2023-12-05 11:05:55', NULL, NULL),
(38, '2D Animation', 1, 'assets/uploads/courseCategories/8361701795972.jpg', 'Admin', '2023-12-05 10:47:40', 'Admin', '2023-12-05 11:06:12', NULL, NULL),
(39, '3D Animation', 1, 'assets/uploads/courseCategories/3241701795877.jpg', 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(40, 'Mobile Development', 1, 'assets/uploads/courseCategories/1601701795901.jpg', 'Admin', '2023-11-19 01:23:53', 'Admin', '2023-12-05 11:05:01', NULL, NULL),
(41, 'Game Development', 1, 'assets/uploads/courseCategories/4441701795922.jpg', 'Admin', '2023-11-19 01:24:44', 'Admin', '2023-12-05 11:05:22', NULL, NULL),
(42, 'Database Design & Development', 1, 'assets/uploads/courseCategories/9691701795938.jpg', 'Admin', '2023-11-19 21:20:48', 'Admin', '2023-12-05 11:05:38', NULL, NULL),
(43, 'Data Science', 1, 'assets/uploads/courseCategories/3621701795955.jpg', 'Admin', '2023-11-26 03:36:04', 'Admin', '2023-12-05 11:05:55', NULL, NULL),
(44, 'Entrepreneurship', 1, 'assets/uploads/courseCategories/8361701795972.jpg', 'Admin', '2023-12-05 10:47:40', 'Admin', '2023-12-05 11:06:12', NULL, NULL),
(45, 'Network Technology', 1, 'assets/uploads/courseCategories/3241701795877.jpg', 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(46, 'Hardware', 1, 'assets/uploads/courseCategories/1601701795901.jpg', 'Admin', '2023-11-19 01:23:53', 'Admin', '2023-12-05 11:05:01', NULL, NULL),
(47, 'Software & Security', 1, 'assets/uploads/courseCategories/4441701795922.jpg', 'Admin', '2023-11-19 01:24:44', 'Admin', '2023-12-05 11:05:22', NULL, NULL),
(48, 'Operating System & Server', 1, 'assets/uploads/courseCategories/9691701795938.jpg', 'Admin', '2023-11-19 21:20:48', 'Admin', '2023-12-05 11:05:38', NULL, NULL),
(58, 'sub category one', 1, 'uploads/courses/course-sub-categories/66ae91c785596.jpg', 'Admin', '2024-08-03 20:23:35', NULL, NULL, NULL, NULL),
(59, 'two two', 1, 'uploads/courses/course-sub-categories/66ae96ddbd1c9.jpg', 'Admin', '2024-08-03 20:45:17', NULL, '2024-08-03 20:47:03', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_tag`
--

CREATE TABLE `par_course_tag` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>active 2=>inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_tag`
--

INSERT INTO `par_course_tag` (`id`, `name`, `description`, `status`, `created_at`, `created_by`, `updated_at`, `updated_by`, `altered_at`, `altered_by`) VALUES
(1, 'Popular', 'Popular', 1, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(2, 'Recent', 'Recent', 1, '2023-12-05 11:05:01', 'Admin', NULL, NULL, NULL, NULL),
(3, 'Featured', 'Featured', 1, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(4, 'Upcoming', 'Upcoming', 1, '2023-12-05 11:05:01', 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_course_type`
--

CREATE TABLE `par_course_type` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>active 2=>inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_course_type`
--

INSERT INTO `par_course_type` (`id`, `name`, `description`, `status`, `created_at`, `created_by`, `updated_at`, `updated_by`, `altered_at`, `altered_by`) VALUES
(1, 'Paid', 'Must subscribe to access', 1, '2023-12-05 11:04:37', 'Admin', NULL, NULL, NULL, NULL),
(2, 'Free', 'No subcription required to access', 1, '2023-12-05 11:05:01', 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_curriculum_mapping`
--

CREATE TABLE `par_curriculum_mapping` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `course_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_sub_category_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_curriculum_mapping`
--

INSERT INTO `par_curriculum_mapping` (`id`, `course_id`, `course_category_id`, `course_sub_category_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 6, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(2, 6, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(3, 6, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(4, 7, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(5, 8, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(6, 9, 4, 39, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(7, 10, 2, 3, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(10, 11, 5, 43, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(11, 12, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(12, 13, 4, 47, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(13, 14, 5, 43, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(14, 15, 4, 41, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(15, 61, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(16, 1, 1, 1, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(17, 2, 2, 3, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(18, 3, 1, 2, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(19, 4, 3, 4, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(20, 5, 4, 42, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(21, 6, 1, 38, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(22, 7, 2, 41, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(23, 8, 3, 44, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(24, 9, 4, 43, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(25, 10, 5, 43, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(26, 11, 2, 40, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(27, 12, 3, 44, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(28, 13, 4, 47, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL),
(29, 14, 5, 43, 'Admin', '2023-11-19 00:24:08', 'Admin', '2023-12-05 11:04:37', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_discussions`
--

CREATE TABLE `par_discussions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_email_info`
--

CREATE TABLE `par_email_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email_icon_id` bigint(20) UNSIGNED NOT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_email_info`
--

INSERT INTO `par_email_info` (`id`, `email_icon_id`, `company_email`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 3, 'info@thebuffaloacademy.com', 'Admin', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_enrollments`
--

CREATE TABLE `par_enrollments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `enrollment_date` timestamp NOT NULL DEFAULT '2023-11-27 09:13:29',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_enrollments`
--

INSERT INTO `par_enrollments` (`id`, `student_id`, `course_id`, `enrollment_date`, `start_date`, `end_date`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(2, 248, 7, '2023-12-15 07:30:00', NULL, NULL, 'Admin', '2024-07-10 22:46:47', 'Admin', '2024-07-10 22:46:47', NULL, NULL),
(4, 257, 7, '2023-11-27 09:13:29', '2024-08-16', '2024-10-15', 'Admin', '2024-08-15 16:52:30.000000', NULL, NULL, NULL, NULL),
(15, 248, 6, '2024-08-03 23:24:10', NULL, NULL, NULL, '2024-08-03 23:16:26', NULL, '2024-08-03 23:24:10', NULL, NULL),
(18, 257, 6, '2024-08-03 23:24:42', NULL, NULL, NULL, '2024-08-03 23:24:42', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_events`
--

CREATE TABLE `par_events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `topic` text DEFAULT NULL,
  `goal` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `hosted_by` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `event_day` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_events`
--

INSERT INTO `par_events` (`id`, `title`, `description`, `image`, `topic`, `goal`, `location`, `hosted_by`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `event_day`) VALUES
(12, 'Mastering Web Design and Development: A Hands-On Workshop', 'Embark on a journey to master the art of web development with our intensive hands-on workshop. Whether you are a beginner or an experienced developer, this event is designed to elevate your skills to new heights. Join industry professionals as they guide you through essential coding techniques, best practices, and the latest trends in web development. Bring your laptop and get ready to code alongside experts in a collaborative virtual environment. This workshop promises an interactive and enriching experience for all participants.', 'assets/uploads/events/2.jpg', 'Web Development', 'Equip participants with practical skills to excel in web development.', 'On Site Classroom', 'Your Platform Team', 'Admin', '2024-02-15 00:00:00', NULL, NULL, NULL, NULL, '29th Aug, 2024'),
(13, 'Digital Marketing Trends: Navigating the Ever-Changing Landscape', 'Stay ahead of the curve in the dynamic world of digital marketing. Our in-depth webinar explores the latest trends, tools, and strategies that are shaping the digital marketing landscape. Led by seasoned marketing professionals, this event is a must-attend for anyone looking to enhance their online presence and stay competitive in the digital realm. From social media marketing to SEO best practices, gain actionable insights to elevate your digital marketing game.', 'assets/uploads/events/3.jpg', 'Digital Marketing', 'Provide an overview of current digital marketing trends and effective implementation strategies.', 'Online Webinar', 'Your Platform Team', 'Admin', '2024-03-20 00:00:00', NULL, NULL, NULL, NULL, '25th Aug, 2024'),
(14, 'Multicultural Language Learning Fiesta: A Global Celebration', 'Embark on a linguistic and cultural journey with our Language Learning Fiesta. Immerse yourself in a multicultural celebration where language enthusiasts can explore diverse languages, traditions, and cuisines from around the world. This virtual event is designed to foster cultural appreciation and language diversity. Join us for a fun-filled experience that transcends borders, connecting people through the universal language of curiosity and understanding.', 'assets/uploads/events/4.jpg', 'Language Learning and Cultural Exchange', 'Foster cultural appreciation and language diversity.', 'Virtual Cultural Hub', 'Your Platform Team', 'Admin', '2024-04-25 00:00:00', NULL, NULL, NULL, NULL, '9th Oct, 2024'),
(15, 'Finance Masterclass: Navigating the Stock Market', 'Unlock the secrets of successful investing with our comprehensive finance masterclass. Led by seasoned financial experts, this event goes beyond the basics, guiding participants through the intricacies of the stock market. From investment strategies to risk management, gain valuable insights that will empower both beginners and seasoned investors. Whether you are looking to build a solid investment portfolio or enhance your financial literacy, this online seminar is a must-attend for anyone seeking success in the world of finance.', 'assets/uploads/events/5.jpg', 'Finance and Stock Market', 'Empower participants with knowledge and strategies for successful investing.', 'Online Seminar', 'Your Platform Team', 'Admin', '2024-05-30 00:00:00', NULL, NULL, NULL, NULL, '10th Sept, 2024'),
(16, 'Innovate & Inspire: Tech Entrepreneurship Summit', 'Embark on a transformative journey into the realm of tech entrepreneurship. Our summit brings together visionaries, successful entrepreneurs, and industry experts to share insights, strategies, and stories of innovation. From startup success stories to navigating challenges in the tech industry, this event is a goldmine for aspiring and seasoned entrepreneurs alike. Join us in this virtual summit to ignite your entrepreneurial spirit and discover the keys to building successful tech ventures.', 'assets/uploads/events/6.jpg', 'Tech Entrepreneurship', 'Inspire and educate participants on the principles and challenges of tech entrepreneurship.', 'Virtual Summit', 'Your Platform Team', 'Admin', '2024-06-15 00:00:00', NULL, NULL, NULL, NULL, '19th Oct, 2024'),
(18, 'Wellness and Mindfulness Retreat: Nurturing Your Mind and Body', 'Take a break from the hustle and join us for a virtual wellness retreat focused on nurturing your mind and body. In this rejuvenating experience, we will explore mindfulness practices, relaxation techniques, and holistic wellness approaches. Led by experienced wellness practitioners, this retreat is designed to help you unwind, de-stress, and foster a healthy work-life balance. Prioritize your well-being and join us for a day of self-care and mindfulness.', 'assets/uploads/events/8.jpg', 'Wellness and Mindfulness', 'Promote well-being by providing participants with tools and practices for mindfulness and self-care.', 'Virtual Retreat', 'Your Platform Team', 'Admin', '2024-08-25 00:00:00', NULL, NULL, NULL, NULL, '14th Aug, 2024'),
(19, 'event one by ben omusi', 'event one in to be launched next week', 'assets/uploads/events/8.jpg', 'Artifical Intelligence', 'Imspire par_students to join AI tech industry', 'Nairobi, Kenya', '1', 'Admin', '2024-07-04 07:25:43', 'Admin', '2024-07-04 04:32:08', NULL, NULL, '24th Nov, 2024');

-- --------------------------------------------------------

--
-- Table structure for table `par_failed_par_jobs`
--

CREATE TABLE `par_failed_par_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_footer_info`
--

CREATE TABLE `par_footer_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `logo` varchar(1000) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_on` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_footer_info`
--

INSERT INTO `par_footer_info` (`id`, `title`, `logo`, `description`, `year`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_on`) VALUES
(1, 'The Buffalo Academy', 'assets/uploads/system/logo-white.png', 'Our commitment is to guide you to the finest online par_courses, offering expert insights whenever and wherever you are.', '2024', 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_icons`
--

CREATE TABLE `par_icons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(150) DEFAULT NULL,
  `is_enabled` varchar(150) DEFAULT NULL,
  `icon` varchar(150) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_icons`
--

INSERT INTO `par_icons` (`id`, `name`, `description`, `code`, `is_enabled`, `icon`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'address', NULL, NULL, NULL, 'fas fa-map-marker-alt fa-2x', 'Admin', NULL, NULL, NULL, '', ''),
(2, 'phone number', NULL, NULL, NULL, 'fas fa-phone-alt fa-2x', 'Admin', NULL, NULL, NULL, '', ''),
(3, 'email', NULL, NULL, NULL, 'far fa-envelope fa-2x', 'Admin', NULL, NULL, NULL, '', ''),
(4, 'twitter', NULL, NULL, NULL, 'fab fa-twitter', 'Admin', NULL, NULL, NULL, '', ''),
(5, 'facebook', NULL, NULL, NULL, 'fab fa-facebook-f', 'Admin', NULL, NULL, NULL, '', ''),
(6, 'Linkedin', NULL, NULL, NULL, 'fab fa-linkedin-in', 'Admin', NULL, NULL, NULL, '', ''),
(7, 'Instagram', NULL, NULL, NULL, 'fab fa-instagram', 'Admin', NULL, NULL, NULL, '', ''),
(8, 'Youtube', NULL, NULL, NULL, 'fab fa-youtube', 'Admin', NULL, NULL, NULL, '', ''),
(9, 'Analytical chemistry', 'Analytical chemistry', 'NULL', NULL, 'fa fa-shield-alt', 'Admin', NULL, NULL, NULL, NULL, NULL),
(10, 'Data Analytics', 'Data Aanalytics', NULL, NULL, 'fa fa-chart-pie', 'Admin', NULL, NULL, NULL, NULL, NULL),
(11, 'Web Development', 'Web Development', 'NULL', NULL, 'fa fa-code', 'Admin', NULL, NULL, NULL, NULL, NULL),
(12, 'Apps Development', 'Apps Development', NULL, NULL, 'fab fa-android', 'Admin', NULL, NULL, NULL, NULL, NULL),
(13, 'SEO Optimization', 'SEO Optimization', 'NULL', NULL, 'fa fa-search', 'Admin', NULL, NULL, NULL, NULL, NULL),
(14, 'Our Branches', 'Branch icons', 'NULL', NULL, 'fas fa-map-marker-alt', 'Admin', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_instructors`
--

CREATE TABLE `par_instructors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_bn` varchar(255) DEFAULT NULL,
  `contact_en` varchar(255) DEFAULT NULL,
  `contact_bn` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL DEFAULT 3,
  `bio` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 active, 0 inactive',
  `password` varchar(255) NOT NULL,
  `language` varchar(255) DEFAULT NULL,
  `access_block` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_instructors`
--

INSERT INTO `par_instructors` (`id`, `name_en`, `name_bn`, `contact_en`, `contact_bn`, `email`, `role_id`, `bio`, `title`, `designation`, `image`, `status`, `password`, `language`, `access_block`, `remember_token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `instagram`, `linkedin`, `twitter`, `youtube`, `facebook`, `email_verified`) VALUES
(1, 'Ben Steve', NULL, '01828543453', NULL, 'fuad@gmail.com', 3, 'Steve is a highly skilled Full Stack Web Developer with over 10 years of experience. He specializes in front-end and back-end development, bringing a wealth of knowledge in modern web technologies. Steve is passionate about teaching and enjoys sharing his expertise with aspiring developers.', 'Experienced Full Stack Web Developer passionate about teaching modern web technologies.', 'Senior Instructor', 'assets/uploads/users/Instructor_Burhan Uddin Fuad_137.jpg', 1, '$2y$12$ZsGZnJfm4sKnDmH/nzDdf.3/ZthTEmY99rA9m/rPAXHx1UE6QhJCG', 'en', NULL, NULL, 'Admin', '2023-11-25 15:35:23', 'Admin', '2024-02-21 14:15:36', NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(2, 'John Smith', NULL, '801300029', NULL, 'thouhid@gmail.com', 3, 'Smith is an Animation Expert and Video/Graphics Instructor known for her innovative approach to storytelling through animation. With a background in both 2D and 3D animation, Emily guides par_students through the world of visual storytelling, helping them unleash their creative potential.', '2D Animation and Short Video Ads Specialist', 'Animation Expert', 'assets/uploads/users/Instructor_Thouhidul Islam_766.jpg', 1, '$2y$12$FNBov.CIK58wPQcSSKRToOMru6xabDZvdY34wpOH4Y/PCLZ4VyOLu', 'en', NULL, NULL, 'Admin', '2023-11-25 18:18:45', 'Admin', '2024-02-21 14:17:18', NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(3, 'Raihan Sazzad', NULL, '3218974218', NULL, 'raihan@gmail.com', 3, 'Raihan is an Animation Expert and Video/Graphics Instructor known for her innovative approach to storytelling through animation. With a background in both 2D and 3D animation, Emily guides par_students through the world of visual storytelling, helping them unleash their creative potential.', 'Professional Designer Who Loves to Design', 'UI UX Designer', 'assets/uploads/users/Instructor_Raihan Sazzad_662.jpg', 1, '$2y$12$1x1.vxwZaewnKtRrl4Ieh.8sMHFgz8DFsR5SeAdjPPwQiAiCEEGR6', 'en', NULL, NULL, 'Admin', '2023-12-04 17:25:20', 'Admin', '2024-02-21 14:18:56', NULL, NULL, 'https://www.instagram.com/benel254/', NULL, NULL, NULL, '', 0),
(4, 'Joshim Uddin', NULL, '675664644', NULL, 'joshim@gmail.com', 3, 'Joshim a passionate and results-oriented Digital Marketer with a knack for navigating the ever-evolving landscape of online promotion. With a strategic mindset, he specialize in crafting data-driven marketing campaigns that elevate brand visibility and engagement.', 'Expert in SMM and Lead Generation', 'Digital Marketer', 'assets/uploads/users/Instructor_Joshim Uddin_155.jpg', 1, '$2y$12$t3XmqNf9miC7kaBXYTsAXuBWOZ.ySxQViaaUjh9W78f9DRQhrUvhm', 'en', NULL, NULL, 'Admin', '2023-12-04 17:27:57', 'Admin', '2024-02-21 14:19:51', NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(5, 'Asadullah Galib', NULL, '3453534521', NULL, 'galib@gmail.com', 3, 'Galib is an experienced Full Stack Web Developer known for her expertise in building scalable and robust web applications. With a background in both front-end and back-end development, Jane is dedicated to helping par_students master the skills needed for success in the ever-evolving field of web development.', 'Full Stack Web Developer', 'Lead Instructor', 'assets/uploads/users/Instructor_Asadullah Galib_310.jpg', 1, '$2y$12$rVB66yb.OKaVj0HKcilFweoK5nOx.dJ4e2GHvyaITMvs0DPGgLEpm', 'en', NULL, NULL, 'Admin', '2023-12-05 04:18:26', 'Admin', '2024-02-21 14:20:17', NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(29, 'Koja Johns', NULL, '+243718004262', NULL, 'koja234@gmail.com', 3, NULL, NULL, NULL, 'assets/uploads/instructors/66a74f8f64778.jpg', 1, '$2y$12$acPusrHOV1SFodpHd.2coO7K27WHkJ3uk3OgQRRIyefs8n1cUmjtO', NULL, NULL, NULL, NULL, '2024-07-29 08:15:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(30, 'instructor one', NULL, NULL, NULL, 'hun944231@gmail.com', 3, NULL, NULL, NULL, NULL, 1, '$2y$12$zTnucfmBBUh4BbMsSJoC.O0HnQw/95XAwtSdoSXgXoUG8uoiDQJxC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `par_instructor_education`
--

CREATE TABLE `par_instructor_education` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `instructor_id` bigint(20) UNSIGNED NOT NULL,
  `level_name` varchar(255) NOT NULL,
  `level_description` varchar(255) NOT NULL,
  `year_study` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_instructor_education`
--

INSERT INTO `par_instructor_education` (`id`, `instructor_id`, `level_name`, `level_description`, `year_study`, `created_at`, `created_by`, `updated_at`, `updated_by`, `altered_at`, `altered_by`) VALUES
(57, 1, 'Bachelor degree', 'Computer science', '2018-2022', '2024-07-29 05:44:29', 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_instructor_email_verifications`
--

CREATE TABLE `par_instructor_email_verifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `instructor_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `notified` tinyint(1) DEFAULT 0,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_instructor_email_verifications`
--

INSERT INTO `par_instructor_email_verifications` (`id`, `instructor_id`, `token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `verified_at`, `expires_at`, `notified`, `altered_at`, `altered_by`) VALUES
(65, 30, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGhlbnRpY2F0aW9uLXN1Yi1zeXN0ZW0vaW5zdHJ1Y3Rvci9sb2dpbiIsImlhdCI6MTcyNDQwMjkzMSwiZXhwIjoxNzI0NDA2NTMxLCJuYmYiOjE3MjQ0MDI5MzEsImp0aSI6Ik12UjRxZ082RUVCbTVaMUUiLCJzdWIiOiIzMCIsInBydiI6IjNhMTNmMjkyMTgxZmQ5OTBiNTRlNDZhOGE2NmI1NGNhNDQ4OTJkZGQifQ.duIBNbbNX4aWiSi1yxLYRC6yLcG0GZi7wysTv4JUFKA', NULL, '2024-08-23 05:48:51', NULL, '2024-08-23 08:49:11', NULL, '2024-08-23 06:48:51', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_instructor_experience`
--

CREATE TABLE `par_instructor_experience` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `instructor_id` bigint(20) UNSIGNED NOT NULL,
  `experience_name` varchar(255) NOT NULL,
  `experience_description` varchar(255) NOT NULL,
  `experience_year` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_instructor_experience`
--

INSERT INTO `par_instructor_experience` (`id`, `instructor_id`, `experience_name`, `experience_description`, `experience_year`, `created_at`, `created_by`, `updated_at`, `updated_by`, `altered_at`, `altered_by`) VALUES
(57, 2, 'Software developer', 'Create backend applications', '2023-2024', '2024-07-29 05:47:41', 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_instructor_password_resets`
--

CREATE TABLE `par_instructor_password_resets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `instructor_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_instructor_password_resets`
--

INSERT INTO `par_instructor_password_resets` (`id`, `instructor_id`, `token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(5, 30, '$2y$12$k0u/D2MowH2owyV2oyScJ.PL0TQwHFskWtmE9eld8SMzYx/8q06cO', NULL, '2024-08-23 09:16:48', NULL, NULL, NULL, NULL),
(6, 29, '$2y$12$dyU81apETajHuTi05PNwJO2MOtF8yynT3I3XbEYkLIrmh53YSUTpO', NULL, '2024-08-23 09:11:12', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_instructor_tokens`
--

CREATE TABLE `par_instructor_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `instructor_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_instructor_tokens`
--

INSERT INTO `par_instructor_tokens` (`id`, `instructor_id`, `token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `expires_at`) VALUES
(239, 30, '0ddfe03cac243b13825f63da59c83d254d8c1fd38260c8764bc7f156da44965c', NULL, '2024-08-23 14:32:43', NULL, '2024-08-23 14:32:43', NULL, NULL, '2024-08-23 12:32:43');

-- --------------------------------------------------------

--
-- Table structure for table `par_jobs`
--

CREATE TABLE `par_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_job_batches`
--

CREATE TABLE `par_job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_par_jobs` int(11) NOT NULL,
  `pending_par_jobs` int(11) NOT NULL,
  `par_failed_par_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `finished_at` int(11) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_landing_page`
--

CREATE TABLE `par_landing_page` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(220) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_landing_page`
--

INSERT INTO `par_landing_page` (`id`, `title`, `description`, `image`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Unlock Knowledge Anywhere, Anytime With Experts.', 'Our commitment is to guide you to the finest online par_courses, offering expert insights whenever and wherever you are.', 'assets/uploads/home/landingpage/banner-image-01.png', 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_learning_steps`
--

CREATE TABLE `par_learning_steps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `step_number` varchar(220) DEFAULT NULL,
  `title` varchar(220) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_learning_steps`
--

INSERT INTO `par_learning_steps` (`id`, `step_number`, `title`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `image`) VALUES
(1, '1', 'Make Your Own Place.', 'Fusce dictum, velit eu placerat consectetur, ante nisl auctor magna, sit amet fringilla urna nibh a risus.', 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL, 'assets/uploads/home/learningsteps/hero-img-01.jpg'),
(2, '2', 'Find Best Course With Better Filtter.', 'Morbi id est a risus sollicitudin maximus. Fusce lorem neque, tincidunt vel rhoncus eget, convallis ullamcorper sem.', 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL, 'assets/uploads/home/learningsteps/hero-img-01.jpg'),
(3, '1', 'And Become a Master in Your Field.', 'Sed pulvinar dignissim neque, ac consectetur urna tincidunt vel. Sed congue nulla sed tempus ultrices.', 'Admin', '2024-03-14 10:00:48', NULL, NULL, NULL, NULL, 'assets/uploads/home/learningsteps/hero-img-01.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `par_lessons`
--

CREATE TABLE `par_lessons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `course_curriculum_id` bigint(20) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `minutes` int(11) NOT NULL,
  `seconds` int(11) DEFAULT 0,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_lessons`
--

INSERT INTO `par_lessons` (`id`, `title`, `course_curriculum_id`, `description`, `notes`, `minutes`, `seconds`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Introduction to HTML', 58, 'In this lesson, par_students will be introduced to the fundamental structure of web development with HTML (Hypertext Markup Language). They will learn about the basic syntax of HTML tags, the document structure, and how to create a simple webpage. Emphasis will be placed on understanding the purpose of common HTML elements such as headings, paragraphs, lists, and links.', 'Introduction to HTML:\r\n\r\nHTML stands for Hypertext Markup Language.\r\nIt is the standard markup language for creating web pages.\r\nHTML tags are used to define and structure content on a webpage.\r\nDocument Structure:\r\n\r\nExplain the basic structure of an HTML document: !DOCTYPE html, html, head, and body tags.\r\nDiscuss the purpose of the head section for meta-information and the body section for content.\r\nCommon HTML Elements:\r\n\r\nIntroduce essential HTML tags such as h1, p, ul, li, and a.\r\nDemonstrate how to create hyperlinks using the a tag.\r\nHands-on Activity:\r\n\r\nHave par_students create a simple webpage with a heading, paragraphs, a list, and a hyperlink.\r\nEncourage them to experiment with different HTML elements.', 23, 9, 'Admin', '2023-12-17 12:28:08', 'Admin', '2023-12-21 00:14:51', NULL, NULL),
(2, 'Introduction to CSS', 59, 'This lesson focuses on Cascading Style Sheets (CSS) and how it is used to enhance the presentation of HTML documents. par_students will learn about selectors, properties, and values. The goal is for par_students to understand how to apply styles to HTML elements and gain insight into the concept of styling cascades.', 'Introduction to CSS:\r\n\r\nCSS stands for Cascading Style Sheets.\r\nIt is used to style the layout and presentation of HTML documents.\r\nSelectors and Properties:\r\n\r\nIntroduce CSS selectors and how they target HTML elements.\r\nDiscuss common CSS properties such as color, font-size, margin, and padding.\r\nBox Model:\r\n\r\nExplain the CSS box model: margin, border, padding, and content.\r\nDemonstrate how to use the box model to control spacing and layout.\r\nStyling Cascades:\r\n\r\nDiscuss the concept of cascading styles and how conflicting styles are resolved.\r\nIntroduce specificity and the importance of understanding the order of styles.\r\nHands-on Activity:\r\n\r\nHave par_students apply styles to the HTML webpage created in Lesson 1.\r\nExperiment with changing colors, fonts, and layout properties.', 13, 1, 'Admin', '2023-12-17 21:21:51', 'Admin', '2023-12-21 00:16:54', NULL, NULL),
(3, 'JavaScript Tutorial', 60, 'This lesson introduces par_students to the basics of JavaScript, a programming language that enables dynamic and interactive web pages. par_students will learn about variables, data types, and basic control structures. The lesson culminates in a simple interactive program.', 'Introduction to JavaScript:\r\n\r\nJavaScript is a scripting language that enables client-side interactivity in web browsers.\r\nIt is used to manipulate the content and behavior of HTML documents.\r\nVariables and Data Types:\r\n\r\nIntroduce the concept of variables and how they are used to store data.\r\nCover basic data types: strings, numbers, and booleans.\r\nBasic Control Structures:\r\n\r\nExplain control structures such as if statements for conditional logic.\r\nIntroduce loops, specifically the for loop, for repetitive tasks.\r\nDOM Manipulation:\r\n\r\nDiscuss the Document Object Model (DOM) and how JavaScript can be used to manipulate HTML elements dynamically.\r\nShow examples of changing text, styles, and adding/removing elements.\r\nHands-on Activity:\r\n\r\nGuide par_students in creating a simple interactive program using JavaScript.\r\nEncourage them to modify the HTML and CSS based on user interactions.', 16, 23, 'Admin', '2023-12-19 21:51:36', 'Admin', '2023-12-21 00:17:47', NULL, NULL),
(4, 'Ecma Script Javascript', 60, 'This lesson introduces students to the basics of JavaScript, a programming language that enables dynamic and interactive web pages. ', 'Introduction to EcmaScript.', 16, 23, 'Admin', '2023-12-19 21:51:36', 'Admin', '2023-12-21 00:17:47', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_lessons_mapping`
--

CREATE TABLE `par_lessons_mapping` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `course_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_sub_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_curriculum_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_lessons_mapping`
--

INSERT INTO `par_lessons_mapping` (`id`, `course_id`, `course_category_id`, `course_sub_category_id`, `course_curriculum_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 6, 1, 1, 58, 'Admin', '2023-12-17 12:28:08', 'Admin', '2023-12-21 00:14:51', NULL, NULL),
(2, 6, 1, 1, 59, 'Admin', '2023-12-17 21:21:51', 'Admin', '2023-12-21 00:16:54', NULL, NULL),
(3, 6, 1, 1, 60, 'Admin', '2023-12-19 21:51:36', 'Admin', '2023-12-21 00:17:47', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_materials`
--

CREATE TABLE `par_materials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('video','document','zipped','dataset','others','quiz') NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `content_url` text DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_materials`
--

INSERT INTO `par_materials` (`id`, `lesson_id`, `title`, `type`, `content`, `content_url`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 1, 'HTML Attributes', 'video', 'assets/uploads/courses/contents/materials/videos/5971703138819.mp4', NULL, 'Admin', '2023-12-17 21:16:21', 'Admin', '2023-12-21 00:05:53', NULL, NULL),
(2, 1, 'HTML Tables', 'video', 'assets/uploads/courses/contents/materials/videos/5971703138819.mp4', NULL, 'Admin', '2023-12-17 21:23:30', 'Admin', '2023-12-21 00:06:07', NULL, NULL),
(3, 2, 'CSS Syntax', 'video', 'assets/uploads/courses/contents/materials/videos/5971703138819.mp4', NULL, 'Admin', '2023-12-19 21:45:05', 'Admin', '2023-12-21 00:06:25', NULL, NULL),
(4, 2, 'CSS Selectors', 'document', 'assets/uploads/courses/contents/materials/documents/66aeb520c7895.pdf', NULL, 'Admin', '2023-12-19 21:46:44', 'Admin', '2023-12-21 00:09:25', NULL, NULL),
(5, 2, 'CSS Colors', 'video', 'assets/uploads/courses/contents/materials/videos/5971703138819.mp4', NULL, 'Admin', '2023-12-19 21:52:59', 'Admin', '2023-12-21 00:06:39', NULL, NULL),
(6, 3, 'JavaScript Statements', 'video', 'assets/uploads/courses/contents/materials/videos/5971703138819.mp4', NULL, 'Admin', '2023-12-19 21:56:54', 'Admin', '2023-12-21 00:06:59', NULL, NULL),
(7, 3, 'JavaScript Variables', 'document', 'assets/uploads/courses/contents/materials/documents/66aeb520c7895.pdf', NULL, 'Admin', '2023-12-19 21:59:01', 'Admin', '2023-12-21 00:08:39', NULL, NULL),
(8, 3, 'JavaScript Data Types', 'video', 'assets/uploads/courses/contents/materials/videos/5971703138819.mp4', NULL, 'Admin', '2023-12-21 00:07:50', 'Admin', '2023-12-21 00:07:50', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_materials_mapping`
--

CREATE TABLE `par_materials_mapping` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `course_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_sub_category_id` bigint(20) UNSIGNED NOT NULL,
  `course_curriculum_id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_materials_mapping`
--

INSERT INTO `par_materials_mapping` (`id`, `course_id`, `course_category_id`, `course_sub_category_id`, `course_curriculum_id`, `lesson_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 6, 1, 1, 58, 1, 'Admin', '2023-12-17 21:16:21', 'Admin', '2023-12-21 00:05:53', NULL, NULL),
(2, 6, 1, 1, 58, 1, 'Admin', '2023-12-17 21:23:30', 'Admin', '2023-12-21 00:06:07', NULL, NULL),
(3, 6, 1, 2, 59, 2, 'Admin', '2023-12-19 21:45:05', 'Admin', '2023-12-21 00:06:25', NULL, NULL),
(4, 6, 1, 2, 59, 2, 'Admin', '2023-12-19 21:46:44', 'Admin', '2023-12-21 00:09:25', NULL, NULL),
(5, 6, 1, 2, 59, 2, 'Admin', '2023-12-19 21:52:59', 'Admin', '2023-12-21 00:06:39', NULL, NULL),
(6, 6, 2, 3, 60, 3, 'Admin', '2023-12-19 21:56:54', 'Admin', '2023-12-21 00:06:59', NULL, NULL),
(7, 6, 2, 3, 60, 3, 'Admin', '2023-12-19 21:59:01', 'Admin', '2023-12-21 00:08:39', NULL, NULL),
(8, 6, 2, 3, 60, 3, 'Admin', '2023-12-21 00:07:50', 'Admin', '2023-12-21 00:07:50', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_messages`
--

CREATE TABLE `par_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_options`
--

CREATE TABLE `par_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `option_text` varchar(255) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_options`
--

INSERT INTO `par_options` (`id`, `question_id`, `option_text`, `is_correct`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 1, 'Hyper Text Markup Language', 1, 'Admin', '2023-11-28 07:56:46', 'Admin', '2023-11-28 07:56:46', NULL, NULL),
(2, 1, 'Hyperlinks and Text Markup Language', 0, 'Admin', '2023-11-28 07:58:01', 'Admin', '2023-11-28 07:58:01', NULL, NULL),
(3, 1, 'Home Tool Markup Languages', 0, 'Admin', '2023-11-28 07:58:24', 'Admin', '2023-11-28 08:01:38', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_partners_info`
--

CREATE TABLE `par_partners_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `partner_logo_path` varchar(500) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_partners_info`
--

INSERT INTO `par_partners_info` (`id`, `partner_logo_path`, `name`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'public/system_partners/65ec396f57d5d.jpg', 'Internationl Hearts', 'Internationl Hearts', 'Admin', NULL, '1', '2024-03-09 10:26:55', NULL, NULL),
(2, 'public/system_partners/65ec398b4f96d.jpg', 'LOGO', 'LOGO', 'Admin', NULL, '1', '2024-03-09 10:27:23', NULL, NULL),
(3, 'public/system_partners/65ec399a4e676.jpg', 'Samsung', 'Samsung', 'Admin', NULL, '1', '2024-03-09 10:27:38', NULL, NULL),
(4, 'public/system_partners/65ec39ac7df3d.jpg', 'SoundWave', 'SoundWave', 'Admin', NULL, '1', '2024-03-09 10:27:56', NULL, NULL),
(5, 'public/system_partners/65ec39bdc6b50.jpg', 'Brand', 'Brand', 'Admin', NULL, '1', '2024-03-09 10:28:13', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_payments`
--

CREATE TABLE `par_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `currency_code` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `currency_value` decimal(10,2) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `txnid` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 pending, 1 successfull, 2 fail',
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_payments`
--

INSERT INTO `par_payments` (`id`, `student_id`, `currency`, `currency_code`, `amount`, `currency_value`, `method`, `txnid`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 220, 'BDT', 'BDT', 182.16, 1.00, 'SSLCommerz', 'SSLCZ_TXN_657699d29ce57', 0, 'Admin', '2023-12-10 23:10:42', 'Admin', '2023-12-10 23:10:42', NULL, NULL),
(2, 10, 'BDT', 'BDT', 91.08, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65769ad5411ed', 1, 'Admin', '2023-12-10 23:15:01', 'Admin', '2023-12-10 23:15:05', NULL, NULL),
(3, 10, 'BDT', 'BDT', 91.08, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65769e8f0cf11', 1, 'Admin', '2023-12-10 23:30:55', 'Admin', '2023-12-10 23:30:59', NULL, NULL),
(4, 10, 'BDT', 'BDT', 182.16, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65769f2a84099', 1, 'Admin', '2023-12-10 23:33:30', 'Admin', '2023-12-10 23:33:34', NULL, NULL),
(5, 14, 'BDT', 'BDT', 113.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_6576a5e82a723', 1, 'Admin', '2023-12-11 00:02:16', 'Admin', '2023-12-11 00:02:25', NULL, NULL),
(6, 14, 'BDT', 'BDT', 113.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_6576a7c21ecb3', 0, 'Admin', '2023-12-11 00:10:10', 'Admin', '2023-12-11 00:10:10', NULL, NULL),
(7, 14, 'BDT', 'BDT', 113.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_6576a8b00421a', 1, 'Admin', '2023-12-11 00:14:08', 'Admin', '2023-12-11 00:14:48', NULL, NULL),
(8, 14, 'BDT', 'BDT', 113.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_6576a8f323604', 1, 'Admin', '2023-12-11 00:15:15', 'Admin', '2023-12-11 00:15:26', NULL, NULL),
(9, 17, 'BDT', 'BDT', 145.36, 1.00, 'SSLCommerz', 'SSLCZ_TXN_657fea661d5b3', 0, 'Admin', '2023-12-18 00:44:54', 'Admin', '2023-12-18 00:44:54', NULL, NULL),
(10, 17, 'BDT', 'BDT', 145.36, 1.00, 'SSLCommerz', 'SSLCZ_TXN_657feb1853ccc', 0, 'Admin', '2023-12-18 00:47:52', 'Admin', '2023-12-18 00:47:52', NULL, NULL),
(11, 17, 'BDT', 'BDT', 91.08, 1.00, 'SSLCommerz', 'SSLCZ_TXN_657fee632397d', 0, 'Admin', '2023-12-18 01:01:55', 'Admin', '2023-12-18 01:01:55', NULL, NULL),
(12, 17, 'BDT', 'BDT', 113.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_657fef18a049e', 0, 'Admin', '2023-12-18 01:04:56', 'Admin', '2023-12-18 01:04:56', NULL, NULL),
(13, 17, 'BDT', 'BDT', 113.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_657ff023049f9', 1, 'Admin', '2023-12-18 01:09:23', 'Admin', '2023-12-18 01:09:26', NULL, NULL),
(14, 17, 'BDT', 'BDT', 0.00, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65810ee5590a9', 0, 'Admin', '2023-12-18 21:32:53', 'Admin', '2023-12-18 21:32:53', NULL, NULL),
(15, 17, 'BDT', 'BDT', 0.00, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65810eeaba3cd', 0, 'Admin', '2023-12-18 21:32:58', 'Admin', '2023-12-18 21:32:58', NULL, NULL),
(16, 17, 'BDT', 'BDT', 67.85, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65810efe527f4', 1, 'Admin', '2023-12-18 21:33:18', 'Admin', '2023-12-18 21:33:25', NULL, NULL),
(17, 17, 'BDT', 'BDT', 4600.00, 1.00, 'SSLCommerz', 'SSLCZ_TXN_65829556dfd67', 1, 'Admin', '2023-12-20 01:18:46', 'Admin', '2023-12-20 01:18:53', NULL, NULL),
(18, 17, 'BDT', 'BDT', 4600.00, 1.00, 'SSLCommerz', 'SSLCZ_TXN_658412e42bb29', 1, 'Admin', '2023-12-21 04:26:44', 'Admin', '2023-12-21 04:26:50', NULL, NULL),
(19, 17, 'BDT', 'BDT', 5750.00, 1.00, 'SSLCommerz', 'SSLCZ_TXN_658676a7d8af0', 1, 'Admin', '2023-12-22 23:56:55', 'Admin', '2023-12-22 23:57:02', NULL, NULL),
(20, 17, 'BDT', 'BDT', 4600.00, 1.00, 'SSLCommerz', 'SSLCZ_TXN_6592f9adf2b79', 1, 'Admin', '2024-01-01 11:43:10', 'Admin', '2024-01-01 11:43:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_permissions`
--

CREATE TABLE `par_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_permissions`
--

INSERT INTO `par_permissions` (`id`, `role_id`, `name`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(185, 1, 'user.index', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(186, 1, 'user.create', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(187, 1, 'user.show', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(188, 1, 'user.edit', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(189, 1, 'user.destroy', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(190, 1, 'role.index', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(191, 1, 'role.create', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(192, 1, 'role.show', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(193, 1, 'role.edit', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(194, 1, 'role.destroy', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(195, 1, 'student.index', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(196, 1, 'student.create', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(197, 1, 'student.show', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(198, 1, 'student.edit', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(199, 1, 'student.destroy', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(200, 1, 'instructor.index', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(201, 1, 'instructor.create', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(202, 1, 'instructor.show', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(203, 1, 'instructor.edit', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(204, 1, 'instructor.destroy', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(205, 1, 'courseCategory.index', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(206, 1, 'courseCategory.create', 'Admin', '2023-11-29 00:37:43', 'Admin', '2023-11-29 00:37:43', NULL, NULL),
(207, 1, 'courseCategory.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(208, 1, 'courseCategory.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(209, 1, 'courseCategory.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(210, 1, 'course.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(211, 1, 'course.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(212, 1, 'course.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(213, 1, 'course.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(214, 1, 'course.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(215, 1, 'material.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(216, 1, 'material.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(217, 1, 'material.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(218, 1, 'material.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(219, 1, 'material.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(220, 1, 'quiz.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(221, 1, 'quiz.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(222, 1, 'quiz.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(223, 1, 'quiz.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(224, 1, 'quiz.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(225, 1, 'question.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(226, 1, 'question.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(227, 1, 'question.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(228, 1, 'question.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(229, 1, 'question.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(230, 1, 'option.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(231, 1, 'option.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(232, 1, 'option.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(233, 1, 'option.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(234, 1, 'option.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(235, 1, 'answer.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(236, 1, 'answer.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(237, 1, 'answer.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(238, 1, 'answer.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(239, 1, 'answer.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(240, 1, 'review.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(241, 1, 'review.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(242, 1, 'review.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(243, 1, 'review.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(244, 1, 'review.destroy', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(245, 1, 'discussion.index', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(246, 1, 'discussion.create', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(247, 1, 'discussion.show', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(248, 1, 'discussion.edit', 'Admin', '2023-11-29 00:37:44', 'Admin', '2023-11-29 00:37:44', NULL, NULL),
(249, 1, 'discussion.destroy', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(250, 1, 'message.index', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(251, 1, 'message.create', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(252, 1, 'message.show', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(253, 1, 'message.edit', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(254, 1, 'message.destroy', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(255, 1, 'permission.list', 'Admin', '2023-11-29 00:37:45', 'Admin', '2023-11-29 00:37:45', NULL, NULL),
(256, 2, 'student.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(257, 2, 'student.create', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(258, 2, 'student.show', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(259, 2, 'student.edit', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(260, 2, 'student.destroy', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(261, 2, 'instructor.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(262, 2, 'instructor.create', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(263, 2, 'instructor.show', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(264, 2, 'instructor.edit', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(265, 2, 'instructor.destroy', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(266, 2, 'courseCategory.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(267, 2, 'courseCategory.create', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(268, 2, 'courseCategory.show', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(269, 2, 'courseCategory.edit', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(270, 2, 'courseCategory.destroy', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(271, 2, 'course.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(272, 2, 'course.create', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(273, 2, 'course.show', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(274, 2, 'course.edit', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(275, 2, 'course.destroy', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(276, 2, 'material.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(277, 2, 'material.create', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(278, 2, 'material.show', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(279, 2, 'material.edit', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(280, 2, 'material.destroy', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(281, 2, 'quiz.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(282, 2, 'quiz.create', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(283, 2, 'quiz.show', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(284, 2, 'quiz.edit', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(285, 2, 'quiz.destroy', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(286, 2, 'question.index', 'Admin', '2023-11-29 00:38:42', 'Admin', '2023-11-29 00:38:42', NULL, NULL),
(287, 2, 'question.create', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(288, 2, 'question.show', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(289, 2, 'question.edit', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(290, 2, 'question.destroy', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(291, 2, 'option.index', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(292, 2, 'option.create', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(293, 2, 'option.show', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(294, 2, 'option.edit', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(295, 2, 'option.destroy', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(296, 2, 'answer.index', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(297, 2, 'answer.create', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(298, 2, 'answer.show', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(299, 2, 'answer.edit', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(300, 2, 'answer.destroy', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(301, 2, 'review.index', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(302, 2, 'review.create', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(303, 2, 'review.show', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(304, 2, 'review.edit', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(305, 2, 'review.destroy', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(306, 2, 'discussion.index', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(307, 2, 'discussion.create', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(308, 2, 'discussion.show', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(309, 2, 'discussion.edit', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(310, 2, 'discussion.destroy', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(311, 2, 'message.index', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(312, 2, 'message.create', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(313, 2, 'message.show', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(314, 2, 'message.edit', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(315, 2, 'message.destroy', 'Admin', '2023-11-29 00:38:43', 'Admin', '2023-11-29 00:38:43', NULL, NULL),
(345, 3, 'user.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(346, 3, 'role.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(347, 3, 'student.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(348, 3, 'instructor.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(349, 3, 'courseCategory.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(350, 3, 'courseCategory.create', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(351, 3, 'courseCategory.show', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(352, 3, 'courseCategory.edit', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(353, 3, 'courseCategory.destroy', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(354, 3, 'course.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(355, 3, 'course.create', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(356, 3, 'course.show', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(357, 3, 'course.edit', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(358, 3, 'course.destroy', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(359, 3, 'material.index', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(360, 3, 'material.create', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(361, 3, 'material.show', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(362, 3, 'material.edit', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(363, 3, 'material.destroy', 'Admin', '2024-01-02 00:45:52', 'Admin', '2024-01-02 00:45:52', NULL, NULL),
(364, 3, 'lesson.index', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(365, 3, 'lesson.create', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(366, 3, 'lesson.show', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(367, 3, 'lesson.edit', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(368, 3, 'lesson.destroy', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(369, 3, 'coupon.index', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(370, 3, 'coupon.create', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(371, 3, 'coupon.show', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(372, 3, 'coupon.edit', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(373, 3, 'coupon.destroy', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL),
(374, 3, 'enrollment.index', 'Admin', '2024-01-02 00:45:53', 'Admin', '2024-01-02 00:45:53', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_personal_access_tokens`
--

CREATE TABLE `par_personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_progress`
--

CREATE TABLE `par_progress` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `progress_percentage` int(11) NOT NULL DEFAULT 0,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `last_viewed_material_id` bigint(20) UNSIGNED DEFAULT NULL,
  `last_viewed_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_progress`
--

INSERT INTO `par_progress` (`id`, `student_id`, `course_id`, `progress_percentage`, `completed`, `last_viewed_material_id`, `last_viewed_at`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(2, 248, 6, 3, 0, NULL, NULL, NULL, '2024-08-03 21:13:26', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_questions`
--

CREATE TABLE `par_questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `type` enum('multiple_choice','true_false','short_answer') NOT NULL,
  `option_a` varchar(255) DEFAULT NULL,
  `option_b` varchar(255) DEFAULT NULL,
  `option_c` varchar(255) DEFAULT NULL,
  `option_d` varchar(255) DEFAULT NULL,
  `correct_answer` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_questions`
--

INSERT INTO `par_questions` (`id`, `quiz_id`, `content`, `type`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 1, 'What does HTML stand for?', 'multiple_choice', 'Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Languages', 'Home Text Making Language', 'a', 'Admin', '2023-11-28 06:04:51', 'Admin', '2023-11-28 23:39:14', NULL, NULL),
(2, 1, 'Which tag is used to display bold text?', 'multiple_choice', '<a>', '<bold>', '<b>', '<abbr>', 'c', 'Admin', '2023-11-28 06:05:24', 'Admin', '2023-11-28 23:40:30', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_quizzes`
--

CREATE TABLE `par_quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_quizzes`
--

INSERT INTO `par_quizzes` (`id`, `course_id`, `title`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 6, 'Introduction to HTML', 'Admin', '2023-11-28 06:01:21', 'Admin', '2023-11-28 06:16:31', NULL, NULL),
(2, 8, 'Necessity of Keywords and Tags', 'Admin', '2023-11-28 06:01:49', 'Admin', '2023-11-28 06:18:33', NULL, NULL),
(3, 10, 'Get Started with JSX', 'Admin', '2023-11-28 06:02:04', 'Admin', '2023-11-28 06:20:26', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_reviews`
--

CREATE TABLE `par_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_reviews`
--

INSERT INTO `par_reviews` (`id`, `student_id`, `course_id`, `rating`, `comment`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(2, 248, 7, 4, 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam.', '1', '2024-03-09 08:49:42', NULL, NULL, NULL, NULL),
(3, 257, 7, 5, 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam.', '1', '2024-03-09 08:49:23', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_roles`
--

CREATE TABLE `par_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `identity` varchar(30) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_roles`
--

INSERT INTO `par_roles` (`id`, `name`, `identity`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Super Admin', 'superadmin', '2', '2023-11-16 12:16:34', '2', '2023-11-23 09:13:19', NULL, NULL),
(2, 'Admin', 'admin', '2', '2023-11-16 12:16:34', '2', '2023-11-23 09:13:19', NULL, NULL),
(3, 'Instructor', 'instructor', '2', '2023-11-16 12:16:34', '2', '2023-11-23 09:13:19', NULL, NULL),
(4, 'Student', 'student', '2', '2023-11-16 12:16:34', '2', '2023-11-23 09:13:19', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_services_info`
--

CREATE TABLE `par_services_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_icon_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_services_info`
--

INSERT INTO `par_services_info` (`id`, `service_icon_id`, `name`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 9, 'Analytical Chemistry', 'Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed.', 'Admin', NULL, '1', '2024-03-09 11:09:05', NULL, NULL),
(2, 10, 'Data Analytics', 'Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed', 'Admin', NULL, NULL, NULL, NULL, NULL),
(3, 11, 'Web Development', 'Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed', 'Admin', NULL, NULL, NULL, NULL, NULL),
(4, 12, 'Apps Development', 'Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed', 'Admin', NULL, NULL, NULL, NULL, NULL),
(5, 13, 'SEO Optimization', 'Amet justo dolor lorem kasd amet magna sea stet eos vero lorem ipsum dolore sed', 'Admin', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_sessions`
--

CREATE TABLE `par_sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_sessions`
--

INSERT INTO `par_sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
('4qIod0BtM4lcCVOzYYZAZKyDQxvh4nM5dqBWLpKG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVldHMVhhQXBmb1lEV1o0WXZyMVlsM2owNWEyUmphUm16dlNBUVJndSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdXNlci1zeXN0ZW0tcm9sZXMvbWFuYWdlLXJvbGVzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1720072515, 'Admin', '2023-11-28 06:01:49', 'Admin', '2023-11-28 06:18:33', NULL, NULL),
('hdZi8MVv10P2mW8LyweGwCTILy9IDko7Euh3Nm9X', NULL, '127.0.0.1', 'PostmanRuntime/7.39.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGFhT2drbE52ZVk1ZkRyZmpycnNRSmw3ZEhhSkNpT1JsRUpoT3ZpcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdXNlci1zeXN0ZW0tZXZlbnRzL21hbmFnZS1ldmVudHMvMTciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1720071995, 'Admin', '2023-11-28 06:01:49', 'Admin', '2023-11-28 06:18:33', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_social_media`
--

CREATE TABLE `par_social_media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icons_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(2000) NOT NULL,
  `link` varchar(100) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_social_media`
--

INSERT INTO `par_social_media` (`id`, `icons_id`, `name`, `link`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 4, 'Twitter', 'https://thebuffaloacademy.com', 'Admin', NULL, NULL, NULL, NULL, NULL),
(2, 5, 'Facebook', 'https://thebuffaloacademy.com', 'Admin', NULL, NULL, NULL, NULL, NULL),
(3, 7, 'Instagram', 'https://thebuffaloacademy.com', 'Admin', NULL, NULL, NULL, NULL, NULL),
(4, 6, 'Linkedin', 'https://thebuffaloacademy.com', 'Admin', NULL, NULL, NULL, NULL, NULL),
(5, 8, 'Youtube', 'https://thebuffaloacademy.com', 'Admin', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_students`
--

CREATE TABLE `par_students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL DEFAULT 4,
  `name_en` varchar(255) NOT NULL,
  `name_bn` varchar(255) DEFAULT NULL,
  `contact_en` varchar(255) DEFAULT NULL,
  `contact_bn` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT 'Bangladeshi',
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 active, 0 inactive',
  `password` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_students`
--

INSERT INTO `par_students` (`id`, `role_id`, `name_en`, `name_bn`, `contact_en`, `contact_bn`, `email`, `date_of_birth`, `gender`, `image`, `bio`, `profession`, `nationality`, `address`, `city`, `state`, `postcode`, `country`, `status`, `password`, `language`, `remember_token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `email_verified`) VALUES
(248, 4, 'hsd jsd', NULL, NULL, NULL, 'omubenkk@gmail.com', NULL, NULL, NULL, NULL, 'Lead Sales Marketer', 'Uganda', NULL, NULL, NULL, NULL, NULL, 1, '$2y$12$w9E45oFOeFh6DkbtE1RdEOCcee./UMbSGeT5F11UhXnIwDpQ3pPbe', 'en', NULL, 'Admin', '2023-11-28 06:01:49', 'Admin', '2023-11-28 06:18:33', NULL, NULL, 1),
(257, 4, 'John Doe', NULL, '254718004262', NULL, 'mybuzz66@gmail.com', '2000-01-01', 'male', 'views/dev_portal/buffalofrontend/src/assets/uploads/students/6001723593393.jpg', 'I am a data analyst with a passion for uncovering insights hidden within complex datasets. With a strong background in statistics, programming, and data visualization, I specialize in transforming raw data into actionable intelligence. Over the years, I\'ve honed my skills in various analytical tools and languages such as Python, R, SQL, and Tableau, enabling me to tackle diverse data challenges. My experience spans across multiple industries, including finance, healthcare, and marketing, where I\'ve contributed to strategic decision-making and process optimization. I thrive on solving problems, continuously learning, and leveraging data to drive business success.', 'Data Analyst', 'Kenyan', NULL, NULL, NULL, NULL, NULL, 1, '$2y$12$bicUCLEzp.r7dj1mhFoHOeKvdpKJNlVJ7EUfgOIE.bVWcmsc8wqwq', 'en', NULL, 'Admin', '2023-11-28 06:01:49', 'Admin', '2023-11-28 06:18:33', NULL, NULL, 1),
(273, 4, 'john sdsd', NULL, NULL, NULL, 'omubenke@gmail.com', NULL, NULL, NULL, NULL, NULL, 'Bangladeshi', NULL, NULL, NULL, NULL, NULL, 1, '$2y$12$n7iN93o1.nZ3A7VK8lRvBeIm8.wJSYbaOxyuLv1dAj4AfkHgCf7cm', 'en', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(274, 4, 'student last', NULL, NULL, NULL, 'omusi.ben@gmail.com', NULL, NULL, NULL, NULL, NULL, 'Bangladeshi', NULL, NULL, NULL, NULL, NULL, 1, '$2y$12$V2KCY7cEybjOLNDCd5za/Oo2ZMww.vFGWqkmXpsJ4FAyoVbtv.yCK', 'en', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `par_student_email_verifications`
--

CREATE TABLE `par_student_email_verifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `notified` tinyint(1) DEFAULT 0,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_student_email_verifications`
--

INSERT INTO `par_student_email_verifications` (`id`, `student_id`, `token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `verified_at`, `expires_at`, `notified`, `altered_at`, `altered_by`) VALUES
(43, 248, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGhlbnRpY2F0aW9uLXN1Yi1zeXN0ZW0vc3R1ZGVudC9sb2dpbiIsImlhdCI6MTcyMDY4NTcyNSwiZXhwIjoxNzIwNjg5MzI1LCJuYmYiOjE3MjA2ODU3MjUsImp0aSI6ImJxTGp5UHg2amJQOHhidDAiLCJzdWIiOiIyNDgiLCJwcnYiOiIzYTEzZjI5MjE4MWZkOTkwYjU0ZTQ2YThhNjZiNTRjYTQ0ODkyZGRkIn0.Dnn4F2vyyEfoTOZX4R6iMVd_du49IEZk9kLIk6WOg_4', 'Admin', '2024-07-11 05:15:26', 'Admin', '2024-07-11 08:15:45', NULL, '2024-07-11 06:15:26', 1, NULL, NULL),
(52, 257, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGhlbnRpY2F0aW9uLXN1Yi1zeXN0ZW0vc3R1ZGVudC9sb2dpbiIsImlhdCI6MTcyMDY4NjA2NywiZXhwIjoxNzIwNjg5NjY3LCJuYmYiOjE3MjA2ODYwNjcsImp0aSI6Ik1IUzJVVmdWbW1yUjkxdUkiLCJzdWIiOiIyNTciLCJwcnYiOiIzYTEzZjI5MjE4MWZkOTkwYjU0ZTQ2YThhNjZiNTRjYTQ0ODkyZGRkIn0.YzalCSRPcVrKqHYrtDeOTyPHnZNXyRj3yg2vViDTRAM', 'Admin', '2024-07-11 05:21:07', 'Admin', '2024-07-11 08:21:28', NULL, '2024-07-11 06:21:07', 1, NULL, NULL),
(68, 273, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGhlbnRpY2F0aW9uLXN1Yi1zeXN0ZW0vc3R1ZGVudC9yZWdpc3RlciIsImlhdCI6MTcyNDQwMzM5MCwiZXhwIjoxNzI0NDA2OTkwLCJuYmYiOjE3MjQ0MDMzOTAsImp0aSI6IjNaT2FDYnhvdUo4dk9xcjMiLCJzdWIiOiIyNzMiLCJwcnYiOiIzYTEzZjI5MjE4MWZkOTkwYjU0ZTQ2YThhNjZiNTRjYTQ0ODkyZGRkIn0.cjmreZjVz8idmPaYJllsGAT0FLgofJgZ6dLMvtJZOC0', NULL, '2024-08-23 05:56:30', NULL, '2024-08-23 08:57:35', NULL, '2024-08-23 06:56:30', 1, NULL, NULL),
(69, 274, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGhlbnRpY2F0aW9uLXN1Yi1zeXN0ZW0vc3R1ZGVudC9yZWdpc3RlciIsImlhdCI6MTcyNDQwMzg4OCwiZXhwIjoxNzI0NDA3NDg4LCJuYmYiOjE3MjQ0MDM4ODgsImp0aSI6ImlTZjNwSVBGUWVHYUpQTEMiLCJzdWIiOiIyNzQiLCJwcnYiOiIzYTEzZjI5MjE4MWZkOTkwYjU0ZTQ2YThhNjZiNTRjYTQ0ODkyZGRkIn0.OckODJPsh8w059fEfSSAAnz6Xh4QiQl0jiRzecXXsMU', NULL, '2024-08-23 06:04:48', NULL, '2024-08-23 09:05:23', NULL, '2024-08-23 07:04:48', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_student_password_resets`
--

CREATE TABLE `par_student_password_resets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_student_password_resets`
--

INSERT INTO `par_student_password_resets` (`id`, `student_id`, `token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(5, 274, '$2y$12$a9vgc9mC3z6Q7BMJ0cEs.OaNufm4.DY.3NL0vSvtAVohRGVleh9ry', NULL, '2024-08-23 09:09:45', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_student_tokens`
--

CREATE TABLE `par_student_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `par_student_tokens`
--

INSERT INTO `par_student_tokens` (`id`, `student_id`, `token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `expires_at`) VALUES
(228, 257, 'afe1eed59f951c12d3c5f3b2a6597c8f95fb86a241bf6cde76c9fd5e250d0f62', NULL, '2024-08-22 18:23:53', NULL, '2024-08-22 18:23:53', NULL, NULL, '2024-08-22 16:23:53'),
(229, 273, '872a1b24c20139578f905bea5ca0209ccc34293f12a5c70cfbd8d4d31637d367', NULL, '2024-08-23 08:58:07', NULL, '2024-08-23 08:58:07', NULL, NULL, '2024-08-23 06:58:07'),
(231, 274, 'd9a68eac330dcea39377fb0caf1044e9c3cc735f292963d1b1ce3a6f0f0a4d6d', NULL, '2024-08-23 09:08:25', NULL, '2024-08-23 09:08:25', NULL, NULL, '2024-08-23 07:08:25');

-- --------------------------------------------------------

--
-- Table structure for table `par_subscriptions`
--

CREATE TABLE `par_subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `plan` enum('monthly','yearly') NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NULL DEFAULT NULL,
  `status` enum('active','canceled','expired') NOT NULL DEFAULT 'active',
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_tags`
--

CREATE TABLE `par_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(150) DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_tags`
--

INSERT INTO `par_tags` (`id`, `name`, `description`, `code`, `is_enabled`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`) VALUES
(1, 'Data wrangling', 'cleaning of untidy data', NULL, 0, '2', '2024-02-28 00:51:07', NULL, NULL, NULL, NULL),
(2, 'Design', 'Web Design', NULL, 0, '2', '2024-03-03 20:31:03', NULL, NULL, NULL, NULL),
(3, 'Development', 'Web Development', NULL, 0, '2', '2024-03-03 20:31:16', NULL, NULL, NULL, NULL),
(4, 'SEO', 'Web SEO', NULL, 0, '2', '2024-03-03 20:31:34', NULL, NULL, NULL, NULL),
(5, 'Marketing', 'Marketing', NULL, 0, '2', '2024-03-03 20:31:50', NULL, NULL, NULL, NULL),
(6, 'Consulting', 'Consulting', NULL, 0, '2', '2024-03-03 20:32:01', NULL, NULL, NULL, NULL),
(14, 'Tag ten SDSDK', 'the first tags', NULL, 0, NULL, '2024-07-18 12:24:36', NULL, NULL, NULL, NULL),
(15, 'Tag ten SDSDK iweowe', 'the first tags', NULL, 0, NULL, '2024-07-18 12:25:46', NULL, NULL, NULL, NULL),
(20, 'LAST TEST TAG', 'mY ONLY TAG', NULL, 0, NULL, '2024-08-23 11:03:07', NULL, NULL, NULL, NULL),
(21, 'My tag with who createdb by', NULL, NULL, 0, NULL, '2024-08-23 11:16:49', NULL, NULL, NULL, NULL),
(22, 'Tyla', 'Getting Late', NULL, 0, NULL, '2024-08-23 11:17:47', NULL, NULL, NULL, NULL),
(23, 'My tag with who createdb by sd', NULL, NULL, 0, NULL, '2024-08-23 13:57:26', NULL, NULL, NULL, NULL),
(27, 'Baby can Say', 'Country Wizzy', NULL, 0, 'hun944231@gmail.com', '2024-08-23 14:47:46', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `par_users`
--

CREATE TABLE `par_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_bn` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contact_en` varchar(255) NOT NULL,
  `contact_bn` varchar(255) DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `password` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `image` varchar(255) DEFAULT NULL,
  `full_access` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1=>yes, 0=>no',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=>active 2=>inactive',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `par_users`
--

INSERT INTO `par_users` (`id`, `name_en`, `name_bn`, `email`, `contact_en`, `contact_bn`, `role_id`, `password`, `language`, `image`, `full_access`, `status`, `remember_token`, `created_by`, `created_at`, `updated_by`, `updated_at`, `altered_by`, `altered_at`, `email_verified`) VALUES
(2, 'Super Admin', NULL, 'admin@gmail.com', '+2540718004262', NULL, 1, '$2y$12$RDPYtmf4JJwoQ4sEMuVYse6kg.Xnv1vcJ86sZhT63uaL5vrMje69W', 'en', '7741704114296.png', 1, 1, NULL, NULL, '2024-01-01 06:47:43', NULL, '2024-01-01 07:04:57', NULL, NULL, 1),
(4, 'Asadullah Galib', NULL, 'galib@gmail.com', '3453534521', NULL, 3, '$2y$12$CgGd2qfI/1nRHDyzYBUq3.nuw/vWV.e9hP/Ze6T6tEzpgng.Dyl6m', 'en', 'Instructor_Asadullah Galib_310.jpg', 0, 1, NULL, NULL, '2024-01-01 07:49:40', NULL, '2024-02-21 14:20:18', NULL, NULL, 1),
(5, 'Joshim Uddin', NULL, 'joshim@gmail.com', '675664644', NULL, 3, '$2y$12$1l18cpPxU4M2zZgMxECs6ezwQKGM/ton5GsztDIiFz0keVvmVsX4O', 'en', 'Instructor_Joshim Uddin_155.jpg', 0, 1, NULL, NULL, '2024-01-01 07:50:08', NULL, '2024-02-21 14:19:51', NULL, NULL, 1),
(6, 'Raihan Sazzad', NULL, 'raihan@gmail.com', '3218974218', NULL, 3, '$2y$12$slth2axx..G1Nz.3jFSa4eHOfBzJybSrjSY3ocZCOQSx10KEcdqtO', 'en', 'Instructor_Raihan Sazzad_662.jpg', 0, 1, NULL, NULL, '2024-01-01 07:50:18', NULL, '2024-02-21 14:18:57', NULL, NULL, 1),
(7, 'Thouhidul Islam', NULL, 'thouhid@gmail.com', '801300029', NULL, 3, '$2y$12$ua2TYVVOxnQWxa2RFnD1euGL8rRUwzFZ2m/uWOw8V/pFfNI3K8Qxa', 'en', 'Instructor_Thouhidul Islam_766.jpg', 0, 1, NULL, NULL, '2024-01-01 07:50:28', NULL, '2024-02-21 14:17:19', NULL, NULL, 1),
(8, 'Burhan Uddin Fuad', NULL, 'fuad@gmail.com', '01828543453', NULL, 3, '$2y$12$uTGQ75wrj/r/2wZgWe8tVeetckNkgGaqMczxzGhRTbxLWvAfpADp6', 'en', 'Instructor_Burhan Uddin Fuad_137.jpg', 0, 1, NULL, NULL, '2024-01-01 07:50:43', NULL, '2024-02-21 14:15:37', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `par_user_email_verifications`
--

CREATE TABLE `par_user_email_verifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `notified` tinyint(1) DEFAULT 0,
  `altered_at` timestamp NULL DEFAULT NULL,
  `altered_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_user_tokens`
--

CREATE TABLE `par_user_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `par_watchlists`
--

CREATE TABLE `par_watchlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `material_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL,
  `altered_by` varchar(50) DEFAULT NULL,
  `altered_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_misaudit_trail`
--
ALTER TABLE `api_misaudit_trail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_about_info`
--
ALTER TABLE `par_about_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_address_info`
--
ALTER TABLE `par_address_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_address_info_address_icon_id_foreign` (`address_icon_id`);

--
-- Indexes for table `par_answers`
--
ALTER TABLE `par_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_answers_student_id_index` (`student_id`),
  ADD KEY `par_answers_question_id_index` (`question_id`);

--
-- Indexes for table `par_blogs`
--
ALTER TABLE `par_blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_blogs_blog_categories_id_foreign` (`blog_categories_id`),
  ADD KEY `par_blogs_blog_status_id_foreign` (`blog_status_id`),
  ADD KEY `par_blogs_tags_id_foreign` (`tags_id`);

--
-- Indexes for table `par_blog_categories`
--
ALTER TABLE `par_blog_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_blog_status`
--
ALTER TABLE `par_blog_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_cache`
--
ALTER TABLE `par_cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `par_cache_locks`
--
ALTER TABLE `par_cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `par_category_sub_category_mapping`
--
ALTER TABLE `par_category_sub_category_mapping`
  ADD UNIQUE KEY `unique_category_sub_category_mapping` (`course_sub_category_id`),
  ADD KEY `par_category_sub_category_mapping_course_category_id_foreign` (`course_category_id`);

--
-- Indexes for table `par_checkouts`
--
ALTER TABLE `par_checkouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_company_branches`
--
ALTER TABLE `par_company_branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_company_branches_branch_icon_id_foreign` (`branch_icon_id`);

--
-- Indexes for table `par_company_branch_info`
--
ALTER TABLE `par_company_branch_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_contact`
--
ALTER TABLE `par_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_contact_info`
--
ALTER TABLE `par_contact_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_contact_info_phone_icon_id_foreign` (`phone_icon_id`);

--
-- Indexes for table `par_coupons`
--
ALTER TABLE `par_coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_coupons_code_unique` (`code`);

--
-- Indexes for table `par_courses`
--
ALTER TABLE `par_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_courses_course_category_id_index` (`course_category_id`),
  ADD KEY `par_courses_course_sub_category_id_index` (`course_sub_category_id`),
  ADD KEY `par_courses_course_type_id_index` (`course_type_id`),
  ADD KEY `par_courses_course_difficulty_id_index` (`course_difficulty_id`),
  ADD KEY `par_courses_course_tag_id_index` (`course_tag_id`);

--
-- Indexes for table `par_course_categories`
--
ALTER TABLE `par_course_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_course_curriculum`
--
ALTER TABLE `par_course_curriculum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_course_curriculum_course_id_index` (`course_id`);

--
-- Indexes for table `par_course_difficulty`
--
ALTER TABLE `par_course_difficulty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_course_instructors`
--
ALTER TABLE `par_course_instructors`
  ADD UNIQUE KEY `unique_course_instructor` (`course_id`),
  ADD KEY `par_course_instructors_ibfk_2` (`instructor_id`);

--
-- Indexes for table `par_course_overview`
--
ALTER TABLE `par_course_overview`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_course_overview_course_id_index` (`course_id`);

--
-- Indexes for table `par_course_sub_categories`
--
ALTER TABLE `par_course_sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_course_tag`
--
ALTER TABLE `par_course_tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_course_type`
--
ALTER TABLE `par_course_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_curriculum_mapping`
--
ALTER TABLE `par_curriculum_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_curriculum_mapping_course_category_id_index` (`course_category_id`),
  ADD KEY `par_curriculum_mapping_course_sub_category_id_index` (`course_sub_category_id`),
  ADD KEY `par_curriculum_mapping_course_id_index` (`course_id`);

--
-- Indexes for table `par_discussions`
--
ALTER TABLE `par_discussions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_discussions_user_id_index` (`user_id`),
  ADD KEY `par_discussions_course_id_index` (`course_id`);

--
-- Indexes for table `par_email_info`
--
ALTER TABLE `par_email_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_email_info_email_icon_id_foreign` (`email_icon_id`);

--
-- Indexes for table `par_enrollments`
--
ALTER TABLE `par_enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_enrollments_unique` (`student_id`,`course_id`),
  ADD KEY `par_enrollments_course_id_foreign` (`course_id`);

--
-- Indexes for table `par_events`
--
ALTER TABLE `par_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_failed_par_jobs`
--
ALTER TABLE `par_failed_par_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_failed_par_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `par_footer_info`
--
ALTER TABLE `par_footer_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_icons`
--
ALTER TABLE `par_icons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_instructors`
--
ALTER TABLE `par_instructors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_instructors_email_unique` (`email`),
  ADD UNIQUE KEY `par_instructors_contact_en_unique` (`contact_en`),
  ADD UNIQUE KEY `par_instructors_contact_bn_unique` (`contact_bn`),
  ADD KEY `par_instructors_role_id_index` (`role_id`);

--
-- Indexes for table `par_instructor_education`
--
ALTER TABLE `par_instructor_education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_instructor_education_instructor_id_foreign` (`instructor_id`);

--
-- Indexes for table `par_instructor_email_verifications`
--
ALTER TABLE `par_instructor_email_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `par_instructor_experience`
--
ALTER TABLE `par_instructor_experience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_instructor_experience_instructor_id_foreign` (`instructor_id`);

--
-- Indexes for table `par_instructor_password_resets`
--
ALTER TABLE `par_instructor_password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `par_instructor_tokens`
--
ALTER TABLE `par_instructor_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `par_jobs`
--
ALTER TABLE `par_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_jobs_queue_index` (`queue`);

--
-- Indexes for table `par_job_batches`
--
ALTER TABLE `par_job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_landing_page`
--
ALTER TABLE `par_landing_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_learning_steps`
--
ALTER TABLE `par_learning_steps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_lessons`
--
ALTER TABLE `par_lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_lessons_course_curriculum_id_index` (`course_curriculum_id`);

--
-- Indexes for table `par_lessons_mapping`
--
ALTER TABLE `par_lessons_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_lessons_mapping_course_category_id_index` (`course_category_id`),
  ADD KEY `par_lessons_mapping_course_sub_category_id_index` (`course_sub_category_id`),
  ADD KEY `par_lessons_mapping_course_id_index` (`course_id`),
  ADD KEY `par_lessons_mapping_course_curriculum_id_index` (`course_curriculum_id`);

--
-- Indexes for table `par_materials`
--
ALTER TABLE `par_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_materials_lesson_id_index` (`lesson_id`);

--
-- Indexes for table `par_materials_mapping`
--
ALTER TABLE `par_materials_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_materials_mapping_course_category_id_index` (`course_category_id`),
  ADD KEY `par_materials_mapping_course_sub_category_id_index` (`course_sub_category_id`),
  ADD KEY `par_materials_mapping_course_id_index` (`course_id`),
  ADD KEY `par_materials_mapping_course_curriculum_id_index` (`course_curriculum_id`),
  ADD KEY `par_materials_mapping_lesson_id_index` (`lesson_id`);

--
-- Indexes for table `par_messages`
--
ALTER TABLE `par_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_messages_sender_id_index` (`sender_id`),
  ADD KEY `par_messages_receiver_id_index` (`receiver_id`);

--
-- Indexes for table `par_options`
--
ALTER TABLE `par_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_options_question_id_index` (`question_id`);

--
-- Indexes for table `par_partners_info`
--
ALTER TABLE `par_partners_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_payments`
--
ALTER TABLE `par_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_permissions`
--
ALTER TABLE `par_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_permissions_role_id_index` (`role_id`);

--
-- Indexes for table `par_personal_access_tokens`
--
ALTER TABLE `par_personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_personal_access_tokens_token_unique` (`token`),
  ADD KEY `par_personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `par_progress`
--
ALTER TABLE `par_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_progress_student_id_index` (`student_id`),
  ADD KEY `par_progress_course_id_index` (`course_id`),
  ADD KEY `par_progress_last_viewed_material_id_index` (`last_viewed_material_id`);

--
-- Indexes for table `par_questions`
--
ALTER TABLE `par_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_questions_quiz_id_index` (`quiz_id`);

--
-- Indexes for table `par_quizzes`
--
ALTER TABLE `par_quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_quizzes_course_id_index` (`course_id`);

--
-- Indexes for table `par_reviews`
--
ALTER TABLE `par_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_reviews_student_id_index` (`student_id`),
  ADD KEY `par_reviews_course_id_index` (`course_id`);

--
-- Indexes for table `par_roles`
--
ALTER TABLE `par_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_roles_type_unique` (`name`),
  ADD UNIQUE KEY `par_roles_identity_unique` (`identity`);

--
-- Indexes for table `par_services_info`
--
ALTER TABLE `par_services_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_services_info_service_icon_id_foreign` (`service_icon_id`);

--
-- Indexes for table `par_sessions`
--
ALTER TABLE `par_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_sessions_user_id_index` (`user_id`),
  ADD KEY `par_sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `par_social_media`
--
ALTER TABLE `par_social_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_social_media_icons_id_foreign` (`icons_id`);

--
-- Indexes for table `par_students`
--
ALTER TABLE `par_students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_students_email_unique` (`email`);

--
-- Indexes for table `par_student_email_verifications`
--
ALTER TABLE `par_student_email_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `par_student_password_resets`
--
ALTER TABLE `par_student_password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `par_student_tokens`
--
ALTER TABLE `par_student_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `par_subscriptions`
--
ALTER TABLE `par_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_subscriptions_student_id_index` (`student_id`),
  ADD KEY `par_subscriptions_course_id_index` (`course_id`);

--
-- Indexes for table `par_tags`
--
ALTER TABLE `par_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `par_users`
--
ALTER TABLE `par_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `par_users_email_unique` (`email`),
  ADD UNIQUE KEY `par_users_contact_en_unique` (`contact_en`),
  ADD UNIQUE KEY `par_users_contact_bn_unique` (`contact_bn`),
  ADD KEY `par_users_role_id_index` (`role_id`);

--
-- Indexes for table `par_user_email_verifications`
--
ALTER TABLE `par_user_email_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `par_user_tokens`
--
ALTER TABLE `par_user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `par_watchlists`
--
ALTER TABLE `par_watchlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `par_watchlists_student_id_index` (`student_id`),
  ADD KEY `par_watchlists_course_id_index` (`course_id`),
  ADD KEY `par_watchlists_lesson_id_index` (`lesson_id`),
  ADD KEY `par_watchlists_material_id_index` (`material_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_misaudit_trail`
--
ALTER TABLE `api_misaudit_trail`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `par_about_info`
--
ALTER TABLE `par_about_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `par_address_info`
--
ALTER TABLE `par_address_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `par_answers`
--
ALTER TABLE `par_answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_blogs`
--
ALTER TABLE `par_blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `par_blog_categories`
--
ALTER TABLE `par_blog_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `par_blog_status`
--
ALTER TABLE `par_blog_status`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `par_checkouts`
--
ALTER TABLE `par_checkouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `par_company_branches`
--
ALTER TABLE `par_company_branches`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `par_company_branch_info`
--
ALTER TABLE `par_company_branch_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `par_contact`
--
ALTER TABLE `par_contact`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `par_contact_info`
--
ALTER TABLE `par_contact_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `par_coupons`
--
ALTER TABLE `par_coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `par_courses`
--
ALTER TABLE `par_courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `par_course_categories`
--
ALTER TABLE `par_course_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `par_course_curriculum`
--
ALTER TABLE `par_course_curriculum`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `par_course_difficulty`
--
ALTER TABLE `par_course_difficulty`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `par_course_overview`
--
ALTER TABLE `par_course_overview`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `par_course_sub_categories`
--
ALTER TABLE `par_course_sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `par_course_tag`
--
ALTER TABLE `par_course_tag`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `par_course_type`
--
ALTER TABLE `par_course_type`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `par_curriculum_mapping`
--
ALTER TABLE `par_curriculum_mapping`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `par_discussions`
--
ALTER TABLE `par_discussions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_email_info`
--
ALTER TABLE `par_email_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `par_enrollments`
--
ALTER TABLE `par_enrollments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `par_events`
--
ALTER TABLE `par_events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `par_failed_par_jobs`
--
ALTER TABLE `par_failed_par_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_footer_info`
--
ALTER TABLE `par_footer_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `par_icons`
--
ALTER TABLE `par_icons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `par_instructors`
--
ALTER TABLE `par_instructors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `par_instructor_education`
--
ALTER TABLE `par_instructor_education`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `par_instructor_email_verifications`
--
ALTER TABLE `par_instructor_email_verifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `par_instructor_experience`
--
ALTER TABLE `par_instructor_experience`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `par_instructor_password_resets`
--
ALTER TABLE `par_instructor_password_resets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `par_instructor_tokens`
--
ALTER TABLE `par_instructor_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- AUTO_INCREMENT for table `par_jobs`
--
ALTER TABLE `par_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_landing_page`
--
ALTER TABLE `par_landing_page`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `par_learning_steps`
--
ALTER TABLE `par_learning_steps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `par_lessons`
--
ALTER TABLE `par_lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `par_lessons_mapping`
--
ALTER TABLE `par_lessons_mapping`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `par_materials`
--
ALTER TABLE `par_materials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `par_materials_mapping`
--
ALTER TABLE `par_materials_mapping`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `par_messages`
--
ALTER TABLE `par_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_options`
--
ALTER TABLE `par_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `par_partners_info`
--
ALTER TABLE `par_partners_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `par_payments`
--
ALTER TABLE `par_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `par_permissions`
--
ALTER TABLE `par_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=375;

--
-- AUTO_INCREMENT for table `par_personal_access_tokens`
--
ALTER TABLE `par_personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_progress`
--
ALTER TABLE `par_progress`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `par_questions`
--
ALTER TABLE `par_questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `par_quizzes`
--
ALTER TABLE `par_quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `par_reviews`
--
ALTER TABLE `par_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `par_roles`
--
ALTER TABLE `par_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `par_services_info`
--
ALTER TABLE `par_services_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `par_social_media`
--
ALTER TABLE `par_social_media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `par_students`
--
ALTER TABLE `par_students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT for table `par_student_email_verifications`
--
ALTER TABLE `par_student_email_verifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `par_student_password_resets`
--
ALTER TABLE `par_student_password_resets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `par_student_tokens`
--
ALTER TABLE `par_student_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT for table `par_subscriptions`
--
ALTER TABLE `par_subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `par_tags`
--
ALTER TABLE `par_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `par_users`
--
ALTER TABLE `par_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `par_user_email_verifications`
--
ALTER TABLE `par_user_email_verifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `par_watchlists`
--
ALTER TABLE `par_watchlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `par_address_info`
--
ALTER TABLE `par_address_info`
  ADD CONSTRAINT `par_address_info_address_icon_id_foreign` FOREIGN KEY (`address_icon_id`) REFERENCES `par_icons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_answers`
--
ALTER TABLE `par_answers`
  ADD CONSTRAINT `par_answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `par_questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_answers_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_blogs`
--
ALTER TABLE `par_blogs`
  ADD CONSTRAINT `par_blogs_blog_categories_id_foreign` FOREIGN KEY (`blog_categories_id`) REFERENCES `par_blog_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_blogs_blog_status_id_foreign` FOREIGN KEY (`blog_status_id`) REFERENCES `par_blog_status` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_blogs_tags_id_foreign` FOREIGN KEY (`tags_id`) REFERENCES `par_tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_category_sub_category_mapping`
--
ALTER TABLE `par_category_sub_category_mapping`
  ADD CONSTRAINT `par_category_sub_category_mapping_course_category_id_foreign` FOREIGN KEY (`course_category_id`) REFERENCES `par_course_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_category_sub_category_mapping_course_sub_category_id_foreign` FOREIGN KEY (`course_sub_category_id`) REFERENCES `par_course_sub_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_company_branches`
--
ALTER TABLE `par_company_branches`
  ADD CONSTRAINT `par_company_branches_branch_icon_id_foreign` FOREIGN KEY (`branch_icon_id`) REFERENCES `par_icons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_contact_info`
--
ALTER TABLE `par_contact_info`
  ADD CONSTRAINT `par_contact_info_phone_icon_id_foreign` FOREIGN KEY (`phone_icon_id`) REFERENCES `par_icons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_courses`
--
ALTER TABLE `par_courses`
  ADD CONSTRAINT `par_courses_course_category_id_foreign` FOREIGN KEY (`course_category_id`) REFERENCES `par_course_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_courses_course_difficulty_id_foreign` FOREIGN KEY (`course_difficulty_id`) REFERENCES `par_course_difficulty` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_courses_course_sub_category_id_foreign` FOREIGN KEY (`course_sub_category_id`) REFERENCES `par_course_sub_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_courses_course_tag_id_foreign` FOREIGN KEY (`course_tag_id`) REFERENCES `par_course_tag` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_courses_course_type_id_foreign` FOREIGN KEY (`course_type_id`) REFERENCES `par_course_type` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_course_curriculum`
--
ALTER TABLE `par_course_curriculum`
  ADD CONSTRAINT `par_course_curriculum_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_course_instructors`
--
ALTER TABLE `par_course_instructors`
  ADD CONSTRAINT `par_course_instructors_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_course_instructors_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `par_instructors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_course_overview`
--
ALTER TABLE `par_course_overview`
  ADD CONSTRAINT `par_course_overview_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_curriculum_mapping`
--
ALTER TABLE `par_curriculum_mapping`
  ADD CONSTRAINT `par_curriculum_mapping_course_category_id_foreign` FOREIGN KEY (`course_category_id`) REFERENCES `par_course_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_curriculum_mapping_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_curriculum_mapping_course_sub_category_id_foreign` FOREIGN KEY (`course_sub_category_id`) REFERENCES `par_course_sub_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_discussions`
--
ALTER TABLE `par_discussions`
  ADD CONSTRAINT `par_discussions_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_discussions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `par_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_email_info`
--
ALTER TABLE `par_email_info`
  ADD CONSTRAINT `par_email_info_email_icon_id_foreign` FOREIGN KEY (`email_icon_id`) REFERENCES `par_icons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_enrollments`
--
ALTER TABLE `par_enrollments`
  ADD CONSTRAINT `par_enrollments_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_enrollments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_instructors`
--
ALTER TABLE `par_instructors`
  ADD CONSTRAINT `par_instructors_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `par_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_instructor_education`
--
ALTER TABLE `par_instructor_education`
  ADD CONSTRAINT `par_instructor_education_instructor_id_foreign` FOREIGN KEY (`instructor_id`) REFERENCES `par_instructors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_instructor_email_verifications`
--
ALTER TABLE `par_instructor_email_verifications`
  ADD CONSTRAINT `par_instructor_email_verifications_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `par_instructors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_instructor_experience`
--
ALTER TABLE `par_instructor_experience`
  ADD CONSTRAINT `par_instructor_experience_instructor_id_foreign` FOREIGN KEY (`instructor_id`) REFERENCES `par_instructors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_instructor_password_resets`
--
ALTER TABLE `par_instructor_password_resets`
  ADD CONSTRAINT `par_instructor_password_resets_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `par_instructors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_instructor_tokens`
--
ALTER TABLE `par_instructor_tokens`
  ADD CONSTRAINT `par_instructor_tokens_ibfrk_1` FOREIGN KEY (`instructor_id`) REFERENCES `par_instructors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_lessons`
--
ALTER TABLE `par_lessons`
  ADD CONSTRAINT `par_lessons_course_curriculum_id_foreign` FOREIGN KEY (`course_curriculum_id`) REFERENCES `par_course_curriculum` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_lessons_mapping`
--
ALTER TABLE `par_lessons_mapping`
  ADD CONSTRAINT `par_lessons_mapping_course_category_id_foreign` FOREIGN KEY (`course_category_id`) REFERENCES `par_course_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_lessons_mapping_course_curriculum_id_foreign` FOREIGN KEY (`course_curriculum_id`) REFERENCES `par_course_curriculum` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_lessons_mapping_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_lessons_mapping_course_sub_category_id_foreign` FOREIGN KEY (`course_sub_category_id`) REFERENCES `par_course_sub_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_materials`
--
ALTER TABLE `par_materials`
  ADD CONSTRAINT `par_materials_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `par_lessons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_materials_mapping`
--
ALTER TABLE `par_materials_mapping`
  ADD CONSTRAINT `par_materials_mapping_course_category_id_foreign` FOREIGN KEY (`course_category_id`) REFERENCES `par_course_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_materials_mapping_course_curriculum_id_foreign` FOREIGN KEY (`course_curriculum_id`) REFERENCES `par_course_curriculum` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_materials_mapping_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_materials_mapping_course_sub_category_id_foreign` FOREIGN KEY (`course_sub_category_id`) REFERENCES `par_course_sub_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_materials_mapping_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `par_lessons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_messages`
--
ALTER TABLE `par_messages`
  ADD CONSTRAINT `par_messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `par_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `par_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_options`
--
ALTER TABLE `par_options`
  ADD CONSTRAINT `par_options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `par_questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_permissions`
--
ALTER TABLE `par_permissions`
  ADD CONSTRAINT `par_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `par_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_progress`
--
ALTER TABLE `par_progress`
  ADD CONSTRAINT `par_progress_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_progress_last_viewed_material_id_foreign` FOREIGN KEY (`last_viewed_material_id`) REFERENCES `par_materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_progress_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_questions`
--
ALTER TABLE `par_questions`
  ADD CONSTRAINT `par_questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `par_quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_quizzes`
--
ALTER TABLE `par_quizzes`
  ADD CONSTRAINT `par_quizzes_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_reviews`
--
ALTER TABLE `par_reviews`
  ADD CONSTRAINT `par_reviews_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_reviews_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_services_info`
--
ALTER TABLE `par_services_info`
  ADD CONSTRAINT `par_services_info_service_icon_id_foreign` FOREIGN KEY (`service_icon_id`) REFERENCES `par_icons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_social_media`
--
ALTER TABLE `par_social_media`
  ADD CONSTRAINT `par_social_media_icons_id_foreign` FOREIGN KEY (`icons_id`) REFERENCES `par_icons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_student_email_verifications`
--
ALTER TABLE `par_student_email_verifications`
  ADD CONSTRAINT `par_student_email_verifications_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_student_password_resets`
--
ALTER TABLE `par_student_password_resets`
  ADD CONSTRAINT `par_student_password_resets_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_student_tokens`
--
ALTER TABLE `par_student_tokens`
  ADD CONSTRAINT `par_student_tokens_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_subscriptions`
--
ALTER TABLE `par_subscriptions`
  ADD CONSTRAINT `par_subscriptions_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_subscriptions_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_users`
--
ALTER TABLE `par_users`
  ADD CONSTRAINT `par_users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `par_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_user_email_verifications`
--
ALTER TABLE `par_user_email_verifications`
  ADD CONSTRAINT `par_user_email_verifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `par_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_user_tokens`
--
ALTER TABLE `par_user_tokens`
  ADD CONSTRAINT `par_user_tokens_ibfgk_1` FOREIGN KEY (`user_id`) REFERENCES `par_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `par_watchlists`
--
ALTER TABLE `par_watchlists`
  ADD CONSTRAINT `par_watchlists_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `par_courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_watchlists_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `par_lessons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_watchlists_material_id_foreign` FOREIGN KEY (`material_id`) REFERENCES `par_materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `par_watchlists_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `par_students` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
