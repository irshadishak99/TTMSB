-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 25, 2023 at 03:44 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(32) NOT NULL,
  `studID` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `course` varchar(50) NOT NULL,
  `icStud` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `studID`, `name`, `course`, `icStud`, `address`) VALUES
(1, 'CI22222', 'Muhammad Irshad bin Ishak', 'Bachelor In Computer Science', '990303091111', 'Taman Tok Kayaman,01000, Kangar, Perlis'),
(4, 'AI200019', 'Zakiah binti Abu Bakar', 'Bachelor In Engineering Computer', '9912123232322', 'Cerut Tok Kun,01000, Kangar, Perlis'),
(5, 'AB1234562', 'Muhammad Irshad bin Ishaksss', 'Bachelor In Computer Science', '990303091111', 'Taman Tok Kayaman,01000, Kangar, Perlis'),
(6, 'AI199999', 'Muhammad Mizan bin Munif', 'Bachelor  in Manufacturing Engineering ', '992200441231', 'Kuala Kubu Bharu, Selangor');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(64) NOT NULL,
  `staffID` varchar(64) NOT NULL,
  `fullName` text NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `staffID`, `fullName`, `password`, `email`) VALUES
(3, 'admin', 'admin', '$2b$10$1vKbtZk1E.HvKWflFFwk9.z4HjxB7j6WqnCRmo.mDLV0T1XYu.t32', 'admin'),
(4, 'CI200018', 'Irshad Ishak', '$2b$10$2z4Ey1qIzxiHXYkxTOPX1e6zGVyve7RFyMaTTT9XayPjC3SN1d4dS', 'ci200018@siswa.uthm.edu.my'),
(6, 'ABC123456', 'Ahmad Isa', '$2b$10$Dmsw5D7u1/yzL7ADgYPAkuD5h0yYNrlhssfHqkfUkIvY2bfthp73.', 'abc@mm.com');

-- --------------------------------------------------------

--
-- Table structure for table `transcript`
--

CREATE TABLE `transcript` (
  `id` int(11) NOT NULL,
  `fileName` varchar(50) NOT NULL,
  `filePath` varchar(50) NOT NULL,
  `blockchainHash` varchar(50) NOT NULL,
  `staffID` varchar(255) NOT NULL,
  `studID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transcript`
--

INSERT INTO `transcript` (`id`, `fileName`, `filePath`, `blockchainHash`, `staffID`, `studID`) VALUES
(27, 'CI22222', 'upload\\CI22222.pdf', '0xb5aae62f5036c526d224e3a7de69bd6f9f717ed2da6b3956', '', 'CI22222');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transcript`
--
ALTER TABLE `transcript`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transcript`
--
ALTER TABLE `transcript`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
