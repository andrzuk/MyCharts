-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Wrz 18, 2024 at 08:43 AM
-- Wersja serwera: 10.6.18-MariaDB-cll-lve
-- Wersja PHP: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pressure`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pages`
--

CREATE TABLE `pages` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(512) NOT NULL,
  `contents` longtext DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `visible` tinyint(1) NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `contents`, `description`, `visible`, `modified`) VALUES
(1, 'index', '<h3 style=\"color: #c00;\">Moje wyniki</h3>', 'index', 1, '2022-08-24 09:41:23'),
(2, 'contact', '<p>e-mail:&nbsp;<strong>andrzuk@wp.pl</strong></p>', 'contact', 1, '2022-08-24 08:38:41');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `settings`
--

CREATE TABLE `settings` (
  `id` int(11) UNSIGNED NOT NULL,
  `key_name` varchar(30) NOT NULL,
  `key_value` varchar(1024) NOT NULL,
  `meaning` varchar(128) DEFAULT NULL,
  `modified` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key_name`, `key_value`, `meaning`, `modified`) VALUES
(1, 'app_title', 'My Pressure', 'tytuł aplikacji', '2024-08-26 11:47:22'),
(2, 'app_logo', 'faHome', 'ikona przed tytułem aplikacji', '2024-08-26 11:47:22'),
(3, 'last_values_limit', '1', 'limit listy ostatnich wartości', '2024-08-26 11:47:22'),
(4, 'present_data_limit', '30', 'limit danych na liście i wykresach', '2024-08-26 11:47:22'),
(5, 'sys_border_high', '170', 'górna granica dla SYS', '2024-08-26 11:47:22'),
(6, 'sys_border_low', '140', 'dolna granica dla SYS', '2024-08-26 11:47:22'),
(7, 'dia_border_high', '100', 'górna granica dla DIA', '2024-08-26 11:47:22'),
(8, 'dia_border_low', '90', 'dolna granica dla DIA', '2024-08-26 11:47:22'),
(9, 'pulse_border_high', '70', 'górna granica dla Pulse', '2024-08-26 11:47:22'),
(10, 'pulse_border_low', '60', 'dolna granica dla Pulse', '2024-08-26 11:47:22'),
(11, 'pressure_axis_max', '250', 'wartość max dla wykresu SYS i DIA', '2024-08-26 11:47:22'),
(12, 'pulse_axis_max', '120', 'wartość max dla wykresu Pulse', '2024-08-26 11:47:22');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` varchar(48) NOT NULL,
  `email` varchar(128) NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT 3,
  `logged_in` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `logged_out` datetime NOT NULL,
  `active` tinyint(1) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `status`, `logged_in`, `modified`, `logged_out`, `active`, `token`) VALUES
(1, 'demo', '', 'demo@gmail.com', 4, '2022-08-24 15:21:26', '2022-08-03 08:53:24', '2022-08-03 09:24:20', 1, '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_pressure`
--

CREATE TABLE `_pressure` (
  `id` int(11) UNSIGNED NOT NULL,
  `season` enum('R','W') NOT NULL,
  `sys` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `pulse` int(11) NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key_name`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_login` (`login`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `_pressure`
--
ALTER TABLE `_pressure`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `_pressure`
--
ALTER TABLE `_pressure`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
