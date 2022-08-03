-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Czas generowania: 31 Lip 2022, 14:24
-- Wersja serwera: 10.5.15-MariaDB-10+deb11u1
-- Wersja PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `myCharts`
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `settings`
--

INSERT INTO `settings` (`id`, `key_name`, `key_value`, `meaning`, `modified`) VALUES
(1, 'app_title', 'MyCharts', 'tytuł aplikacji', '2022-07-29 12:17:04'),
(2, 'app_logo', 'faHome', 'ikona przed tytułem aplikacji', '2022-07-29 12:21:30'),
(3, 'last_values_limit', '4', 'limit listy ostatnich wartości', '2022-07-29 12:24:40'),
(4, 'present_data_limit', '40', 'limit danych na liście i wykresach', '2022-07-29 12:27:24'),
(5, 'sys_border_high', '130', 'górna granica dla SYS', '2022-07-29 12:29:23'),
(6, 'sys_border_low', '110', 'dolna granica dla SYS', '2022-07-29 12:29:23'),
(7, 'dia_border_high', '90', 'górna granica dla DIA', '2022-07-29 12:32:45'),
(8, 'dia_border_low', '70', 'dolna granica dla DIA', '2022-07-29 12:32:45'),
(9, 'pulse_border_high', '80', 'górna granica dla Pulse', '2022-07-29 12:34:21'),
(10, 'pulse_border_low', '60', 'dolna granica dla Pulse', '2022-07-29 12:34:21');

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `status`, `logged_in`, `modified`, `logged_out`, `active`, `token`) VALUES
(1, 'demo', '89e495e7941cf9e40e6980d14a16bf023ccd4c91', 'demo@github.com', 1, '2022-08-03 09:19:44', '2022-08-03 08:53:24', '2022-08-03 09:24:20', 1, '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_pressure`
--

CREATE TABLE `_pressure` (
  `id` int(11) UNSIGNED NOT NULL,
  `season` enum('R','W') NOT NULL,
  `sys` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `pulse` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `_pressure`
--

INSERT INTO `_pressure` (`id`, `season`, `sys`, `dia`, `pulse`) VALUES
(1, 'R', 120, 80, 76),
(2, 'W', 122, 85, 71),
(3, 'R', 119, 81, 70),
(4, 'W', 127, 90, 80);

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
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `_pressure`
--
ALTER TABLE `_pressure`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
