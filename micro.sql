-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2021 at 01:55 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `micro`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `ID` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`ID`, `content`) VALUES
(1, 'OR'),
(2, 'XOR'),
(3, 'SHR'),
(4, 'BL,'),
(5, 'CX,'),
(6, 'DH,'),
(7, 'ADD'),
(8, '2'),
(9, 'SHL'),
(10, '3H'),
(11, 'AX,'),
(12, '16'),
(13, '8421H'),
(14, '4'),
(15, 'CH,'),
(16, '1H'),
(18, '0A0H'),
(19, 'BL,'),
(20, '0F000H'),
(21, 'AND'),
(22, '0AAAAH'),
(23, 'CH,'),
(24, '0FH');

-- --------------------------------------------------------

--
-- Table structure for table `conn`
--

CREATE TABLE `conn` (
  `blockid` int(11) NOT NULL,
  `gameid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conn`
--

INSERT INTO `conn` (`blockid`, `gameid`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 6),
(2, 7),
(2, 10),
(3, 8),
(3, 9),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 6),
(4, 7),
(4, 10),
(5, 5),
(5, 8),
(5, 9),
(6, 6),
(6, 7),
(6, 10),
(7, 6),
(7, 7),
(7, 10),
(8, 5),
(8, 8),
(8, 9),
(9, 5),
(9, 8),
(9, 9),
(10, 6),
(10, 7),
(10, 10),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(11, 9),
(11, 10),
(12, 5),
(12, 8),
(12, 9),
(13, 6),
(13, 7),
(13, 10),
(14, 5),
(14, 8),
(14, 9),
(15, 1),
(15, 2),
(15, 3),
(15, 4),
(16, 6),
(16, 7),
(16, 10),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(20, 1),
(20, 2),
(20, 3),
(20, 4),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(22, 1),
(22, 2),
(22, 3),
(22, 4),
(24, 1),
(24, 2),
(24, 3),
(24, 4);

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `ID` int(11) NOT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  `hint` varchar(100) DEFAULT NULL,
  `ax` varchar(11) DEFAULT NULL,
  `bx` varchar(11) DEFAULT NULL,
  `cx` varchar(11) DEFAULT NULL,
  `dx` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`ID`, `question`, `answer`, `hint`, `ax`, `bx`, `cx`, `dx`) VALUES
(1, 'Set bits D5,D7 of bl', 'OR BL, 0A0H', 'or [operand], [operand]', '0F98', '010C', '012C', '312A'),
(2, 'Clear the even-numbered bits in AX to 0', 'AND AX, 0AAAAH', 'and [operand], [operand]', '0F98', '01AC', '012C', '312A'),
(3, 'Set the most significant nibble in AX to 1', 'OR AX, 0F000H', 'or [operand], [operand]', '0A88', '01AC', '012C', '312A'),
(4, 'Reverse the first nibble of CH', 'XOR CH, 0FH', 'xor [operand], [operand]', 'FA88', '01AC', '012C', '312A'),
(5, 'Clear the content of cx', 'SHL CX, 16', 'shl [operand], [operand]', 'FA88', '01AC', '0E2C', '312A'),
(6, 'change the content of DH to change the parity', 'XOR DH, 1H', 'xor [operand], [operand]', 'FA88', '01AC', '0000', '312A'),
(7, 'Increase the content of bl by three', 'ADD BL, 3H', 'add [operand], [operand]', 'FA88', '01AC', '0000', '302A'),
(8, 'Multiply the content of CX by 4', 'SHL CX, 2', 'shl [operand], [operand]', 'FA88', '01AF', '0E2C', '302A'),
(9, 'Divide the content of AX by 16', 'SHR AX, 4', 'shr [operand], [operand]', 'FA88', '01AF', '38B0', '302A'),
(10, 'Invert bits number 0, 5, 10, and 15 in AX', 'XOR AX, 8421H', 'xor [operand], [operand]', '0FA8', '01AF', '38B0', '302A');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `conn`
--
ALTER TABLE `conn`
  ADD PRIMARY KEY (`blockid`,`gameid`),
  ADD KEY `gameid` (`gameid`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conn`
--
ALTER TABLE `conn`
  ADD CONSTRAINT `conn_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `game` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `conn_ibfk_2` FOREIGN KEY (`blockid`) REFERENCES `blocks` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
