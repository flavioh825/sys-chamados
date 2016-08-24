-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 24-Ago-2016 às 14:48
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chamadosdb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `nome` varchar(255) DEFAULT NULL,
  `descricao` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`nome`, `descricao`, `id`, `createdAt`, `updatedAt`) VALUES
('E-mail', 'solicitações referentes a email', 1, '2016-08-23 08:45:05', '2016-08-23 08:45:05'),
('Computador', 'solicitações referentes a computadores', 2, '2016-08-23 08:45:45', '2016-08-23 08:45:45'),
('Site', 'Solicitações referentes ao site.', 3, '2016-08-23 08:46:26', '2016-08-23 08:46:26'),
('Psins', 'Solicitações referentes ao PSINS.', 4, '2016-08-23 08:47:47', '2016-08-23 08:55:27'),
('Internet', 'Solicitações referentes a internet.', 5, '2016-08-23 08:48:26', '2016-08-23 08:48:26'),
('Rede', 'Solicitações referentes a rede.', 6, '2016-08-23 08:48:56', '2016-08-23 08:48:56'),
('Simulador', 'Solicitações referentes ao simulador.', 7, '2016-08-23 08:55:18', '2016-08-23 08:55:18');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamado`
--

CREATE TABLE IF NOT EXISTS `chamado` (
  `ocorrencia` varchar(255) DEFAULT NULL,
  `descricao` longtext,
  `prioridade` varchar(255) DEFAULT NULL,
  `situacao` int(11) DEFAULT NULL,
  `idcategoria` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `chamado`
--

INSERT INTO `chamado` (`ocorrencia`, `descricao`, `prioridade`, `situacao`, `idcategoria`, `idusuario`, `id`, `createdAt`, `updatedAt`) VALUES
('Site fora do ar', 'Hoje as 10hs percebi que o site está fora do ar.', 'Alta', 1, 3, 1, 1, '2016-08-23 08:50:20', '2016-08-23 08:50:20'),
('E-mail não funciona', 'após enviar emails, recebo uma notificação de erro.', 'Alta', 1, 1, 1, 2, '2016-08-23 08:53:58', '2016-08-23 08:53:58'),
('computador não liga', 'Computador da sala 2 não está ligando.', 'Média', 1, 2, 1, 3, '2016-08-23 08:54:53', '2016-08-23 08:54:53'),
('Erro ao gerar exercícios', 'Não consigo gerar exercícios no simulador.', 'Baixa', 1, 7, 1, 4, '2016-08-23 08:56:15', '2016-08-23 08:56:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `departamento`
--

CREATE TABLE IF NOT EXISTS `departamento` (
  `nome` varchar(255) DEFAULT NULL,
  `andar` varchar(255) DEFAULT NULL,
  `numero_sala` varchar(255) DEFAULT NULL,
  `unidade` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Extraindo dados da tabela `departamento`
--

INSERT INTO `departamento` (`nome`, `andar`, `numero_sala`, `unidade`, `id`, `createdAt`, `updatedAt`) VALUES
('Suporte', '14', '', 'ICN Rio', 1, '2016-08-23 10:41:03', '2016-08-23 10:41:03'),
('Desenvolvimento', '14', '', 'ICN Rio', 2, '2016-08-23 10:41:19', '2016-08-23 10:41:19'),
('Contabilidade', '15', '', 'ICN Rio', 3, '2016-08-23 10:41:42', '2016-08-23 10:41:42'),
('Administração', '15', '', 'ICN Rio', 4, '2016-08-23 10:42:14', '2016-08-23 10:42:14'),
('Diretoria', '15', '', 'ICN Rio', 5, '2016-08-23 10:43:09', '2016-08-23 10:43:09'),
('Pedagogia', '03', '', 'ICN Rio', 6, '2016-08-23 10:43:35', '2016-08-23 10:43:35'),
('Secretaria', '03', '', 'ICN Rio', 7, '2016-08-23 10:45:37', '2016-08-23 10:45:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `registrooperacao`
--

CREATE TABLE IF NOT EXISTS `registrooperacao` (
  `conteudo` longtext,
  `idusuario` int(11) DEFAULT NULL,
  `idchamado` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `registrooperacao`
--

INSERT INTO `registrooperacao` (`conteudo`, `idusuario`, `idchamado`, `id`, `createdAt`, `updatedAt`) VALUES
('ok, estamos verificando.', 1, 1, 1, '2016-08-23 15:11:24', '2016-08-23 15:11:24'),
('o mesmo continua fora.', 2, 1, 2, '2016-08-23 15:15:14', '2016-08-23 15:15:14'),
('continua fora.', 1, 1, 3, '2016-08-23 15:17:55', '2016-08-23 15:17:55'),
('outro teste', 1, 1, 4, '2016-08-23 15:19:24', '2016-08-23 15:19:24'),
('Me salve!', 1, 2, 5, '2016-08-23 15:34:39', '2016-08-23 15:34:39'),
('o problema foi solucionado.', 5, 2, 6, '2016-08-24 09:15:09', '2016-08-24 09:15:09');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `nome` varchar(255) DEFAULT NULL,
  `sobrenome` varchar(255) DEFAULT NULL,
  `ramal` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `responde_chamado` int(11) DEFAULT NULL,
  `iddepartamento` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`nome`, `sobrenome`, `ramal`, `email`, `senha`, `responde_chamado`, `iddepartamento`, `id`, `createdAt`, `updatedAt`) VALUES
('Flávio', 'Henrique', '2017', 'flavio.henrique@cienciasnauticas.org.br', '$2a$10$EicHW.28OZZlycS.2DxUEeWfqH/tYuP8wYHkkB8YS2P0RWvDsdlVC', 1, 1, 1, '2016-08-24 09:04:28', '2016-08-24 09:04:28'),
('Silva', 'Sauro', '110', 'sauro.silva@gmail.com', '$2a$10$hKWR95ThZMGqvvMqJRYNbOoV6xS6iDsieA47/PxvGlWRkYlBAJmmy', 1, 4, 2, '2016-08-24 09:07:30', '2016-08-24 09:07:30'),
('Iosana', 'Nardelli', '220', 'iosana@gmail.com', '$2a$10$3jPuCSQ3ZP2wDGY9/3glVeXy3P.iXZXTAunSTDk9p4JfsnZJk2XW2', NULL, 6, 3, '2016-08-24 09:09:59', '2016-08-24 09:09:59'),
('Joana', 'Henrique', '438', 'joana@gmail.com', '$2a$10$lWqLHtklK/j88RctFekBO.rG1GgkQpsTzXOLShsxBPl483BHjrkI2', NULL, 5, 4, '2016-08-24 09:11:00', '2016-08-24 09:11:00'),
('Isac', 'Cracken', '332', 'isac@gmail.com', '$2a$10$u4r.4aPpMrUuVTL4ntSjZ.2gGfD6jIHY7F4hPh8ulgEVvCkYhDaFK', NULL, 3, 5, '2016-08-24 09:12:30', '2016-08-24 09:12:30');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
