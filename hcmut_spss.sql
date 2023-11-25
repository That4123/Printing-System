-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 16, 2023 lúc 04:08 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hcmut_spss`
--
CREATE DATABASE IF NOT EXISTS `hcmut_spss` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hcmut_spss`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `printer`
--

CREATE TABLE `printer` (
  `printer_id` int(11) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `campusName` varchar(255) NOT NULL,
  `roomNumber` varchar(63) NOT NULL,
  `buildingName` varchar(63) NOT NULL,
  `printer_status` varchar(127) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Đang đổ dữ liệu cho bảng `printer`
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
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(127) NOT NULL,
  `password` varchar(127) NOT NULL,
  `role` varchar(127) NOT NULL,
  `state` varchar(127) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `email`, `password`, `role`, `state`) VALUES
(2000000, 'Admin 1', 'abc@def.com', '$2b$10$gmZJOS1l9LGpT3HyDPMWkOx.E23.QneEZ0ISy9FDosVE9g8zBz2mm', 'Quản trị viên', 'Đang hoạt động'),
(2000001, 'Student 1', 'abd@def.com', '$2b$10$vPfiwJdRbJsMV04pbav0TOry.VJe9Of6Gdo08d0mVh9VMpjpJUJHy', 'Sinh viên', 'Đang hoạt động');

--
-- Cấu trúc bảng cho bảng `print_request`
--

CREATE TABLE `print_request` (
  `request_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` int(11) NOT NULL,
  `chosen_printer` int(11) NOT NULL,
  `paper_size` varchar(127) NOT NULL,
  `pages_to_print` varchar(127) NOT NULL,
  `is_double_side` tinyint(1) NOT NULL,
  `number_of_copies` int(11) NOT NULL,
  `print_type` varchar(127) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `printer`
--
ALTER TABLE `printer`
  ADD PRIMARY KEY (`printer_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `print_request`
--
ALTER TABLE `print_request`
  ADD PRIMARY KEY (`request_id`);

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

-- --------------------------------------------------------





--
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
