-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2023 at 03:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hcmut_spss`
--
CREATE DATABASE IF NOT EXISTS `hcmut_spss` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hcmut_spss`;

-- --------------------------------------------------------

--
-- Table structure for table `permitted_file_type`
--
-- Creation: Nov 27, 2023 at 03:12 PM
--

CREATE TABLE IF NOT EXISTS `permitted_file_type` (
  `permitted_id` int(11) NOT NULL AUTO_INCREMENT,
  `file_type` varchar(255) NOT NULL,
  `max_file_size` int(127) NOT NULL,
  PRIMARY KEY (`permitted_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `permitted_file_type`:
--

--
-- Dumping data for table `permitted_file_type`
--

INSERT INTO `permitted_file_type` (`permitted_id`, `file_type`, `max_file_size`) VALUES
(1, 'docx', 100),
(2, 'pdf', 100),
(3, 'xlsx', 100),
(4, 'png', 200);

-- --------------------------------------------------------

--
-- Table structure for table `printer`
--
-- Creation: Nov 27, 2023 at 03:12 PM
--

CREATE TABLE IF NOT EXISTS `printer` (
  `printer_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `campusName` varchar(255) NOT NULL,
  `roomNumber` varchar(63) NOT NULL,
  `buildingName` varchar(63) NOT NULL,
  `printer_status` varchar(127) NOT NULL,
  PRIMARY KEY (`printer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `printer`:
--

--
-- Dumping data for table `printer`
--

INSERT INTO `printer` (`printer_id`, `brand`, `model`, `description`, `campusName`, `roomNumber`, `buildingName`, `printer_status`) VALUES
(1, 'Canon', 'LBP 6030', 'Mới, không lem mực', '2', '101', 'H1', 'Đang hoạt động'),
(2, 'Xerox', 'XR1737', 'Mới, không lem mực', '1', '203', 'C5', 'Đang hoạt động'),
(3, 'HP', '2Z609A', 'Mới, không lem mực', '2', '303', 'H3', 'Đang hoạt động'),
(4, 'Canon', 'LBP 4039', 'Mới, không lem mực', '1', '314', 'B1', 'Đang hoạt động'),
(5, 'Epson', 'ESP030', 'Mới, không lem mực', '2', '403', 'H3', 'Đang hoạt động'),
(6, 'Canon', 'G1737', 'Mới, không lem mực', '1', '101', 'B7', 'Đang hoạt động'),
(7, 'HP', '2T394A', 'Mới, không lem mực', '2', '303', 'H6', 'Đang hoạt động'),
(8, 'Canon', 'LBP 5023', 'Mới, không lem mực', '1', '504', 'B1', 'Đang hoạt động');

-- --------------------------------------------------------

--
-- Table structure for table `printing_log`
--
-- Creation: Nov 28, 2023 at 12:36 AM
-- Last update: Nov 28, 2023 at 02:54 PM
--

CREATE TABLE IF NOT EXISTS `printing_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `printer_id` int(11) NOT NULL,
  `print_request_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL DEFAULT current_timestamp(),
  `end_time` datetime NOT NULL,
  `num_of_page_to_print` int(11) NOT NULL,
  `printing_status` enum('Pending','Accepted','Executing','Completed') NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `printing_log`:
--

-- --------------------------------------------------------

--
-- Table structure for table `print_request`
--
-- Creation: Nov 27, 2023 at 03:12 PM
-- Last update: Nov 28, 2023 at 02:54 PM
--

CREATE TABLE IF NOT EXISTS `print_request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `chosen_printer` int(11) NOT NULL,
  `paper_size` enum('A3','A4') NOT NULL,
  `pages_to_print` varchar(127) NOT NULL,
  `is_double_side` tinyint(1) NOT NULL,
  `number_of_copies` int(11) NOT NULL,
  `print_type` varchar(127) NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `print_request`:
--

--
-- Cấu trúc bảng cho bảng `printer`
-- Table structure for table `user`
--

--
-- Cấu trúc bảng cho bảng `user`
--
-- Creation: Nov 27, 2023 at 03:12 PM
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(127) NOT NULL,
  `password` varchar(127) NOT NULL,
  `role` varchar(127) NOT NULL,
  `state` varchar(127) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user`:
--

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `email`, `password`, `role`, `state`) VALUES
(2000000, 'SPSO 1', 'abc@def.com', '$2b$10$gmZJOS1l9LGpT3HyDPMWkOx.E23.QneEZ0ISy9FDosVE9g8zBz2mm', 'Nhân viên SPSO', 'Đang hoạt động'),
(2000001, 'Student 1', 'abd@def.com', '$2b$10$vPfiwJdRbJsMV04pbav0TOry.VJe9Of6Gdo08d0mVh9VMpjpJUJHy', 'Sinh viên', 'Đang hoạt động');


--
-- Cấu trúc bảng cho bảng `print_request`
--

-- --------------------------------------------------------
--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Metadata for table printing_log
--

--
-- Metadata for table print_request
--

--
-- Dumping data for table `pma__table_uiprefs`
--
--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `printer`
--
ALTER TABLE `printer`
  MODIFY `printer_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

--
-- AUTO_INCREMENT cho bảng `print_request`
--
ALTER TABLE `print_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

--
-- AUTO_INCREMENT cho bảng `permitted_file_type`
--
ALTER TABLE `permitted_file_type`
  MODIFY `permitted_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

-- --------------------------------------------------------





--
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
