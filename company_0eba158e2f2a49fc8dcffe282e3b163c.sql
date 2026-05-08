-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2026 at 04:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company_0eba158e2f2a49fc8dcffe282e3b163c`
--

-- --------------------------------------------------------

--
-- Table structure for table `company_details`
--

CREATE TABLE `company_details` (
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `f_year` varchar(10) NOT NULL,
  `company_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_abbr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_tag_line` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pincode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` smallint(6) NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_care` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstin` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pan` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstin_reg_dt` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tan_no` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `s_tax_no` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msme_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `licence_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_qr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_id` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_by` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `district_city_details`
--

CREATE TABLE `district_city_details` (
  `id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `state_name` varchar(27) DEFAULT NULL,
  `district` varchar(24) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `invoice_details_id` int(11) NOT NULL,
  `invoice_no` varchar(50) DEFAULT NULL,
  `invoice_date` varchar(20) DEFAULT NULL,
  `mode_of_purchase` varchar(50) DEFAULT NULL,
  `transport_mode` varchar(50) DEFAULT NULL,
  `vehicle_no` varchar(30) DEFAULT NULL,
  `date_of_supply` varchar(20) DEFAULT NULL,
  `place_of_supply` varchar(100) DEFAULT NULL,
  `creditor_id` int(11) DEFAULT NULL,
  `creditor_name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `gstin` varchar(20) DEFAULT NULL,
  `reverse_charge` tinyint(1) DEFAULT NULL,
  `ship_to_party_checkbox` tinyint(1) DEFAULT NULL,
  `ship_to_party_name` varchar(100) DEFAULT NULL,
  `ship_to_party_address` text DEFAULT NULL,
  `ship_to_party_email` varchar(100) DEFAULT NULL,
  `ship_to_party_phone` varchar(20) DEFAULT NULL,
  `ship_to_party_city` varchar(50) DEFAULT NULL,
  `ship_to_party_pincode` varchar(10) DEFAULT NULL,
  `ship_to_party_country` varchar(50) DEFAULT NULL,
  `ship_to_party_state` int(11) DEFAULT NULL,
  `ship_to_party_gstin` varchar(20) DEFAULT NULL,
  `total_amount_before_tax` decimal(12,2) DEFAULT NULL,
  `total_igst` decimal(12,2) DEFAULT NULL,
  `total_cgst` decimal(12,2) DEFAULT NULL,
  `total_sgst` decimal(12,2) DEFAULT NULL,
  `total_tax_amount` decimal(12,2) DEFAULT NULL,
  `total_amount_after_tax` decimal(12,2) DEFAULT NULL,
  `round_off` decimal(12,2) DEFAULT NULL,
  `grand_total` decimal(12,2) DEFAULT NULL,
  `gst_on_reverse_charge` decimal(12,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item_details`
--

CREATE TABLE `invoice_item_details` (
  `invoice_item_details_id` int(11) NOT NULL,
  `invoice_details_id` int(11) DEFAULT NULL,
  `stock_items_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `cth` int(11) DEFAULT NULL,
  `qty` decimal(10,2) DEFAULT NULL,
  `uqc` varchar(10) DEFAULT NULL,
  `rate` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `discount` decimal(12,2) DEFAULT NULL,
  `subtotal` decimal(12,2) DEFAULT NULL,
  `gst` decimal(5,2) DEFAULT NULL,
  `igst` decimal(12,2) DEFAULT NULL,
  `cgst` decimal(12,2) DEFAULT NULL,
  `sgst` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

CREATE TABLE `ledger` (
  `ledger_id` int(11) NOT NULL,
  `ledger_name` varchar(255) NOT NULL,
  `legal_name` varchar(255) NOT NULL,
  `ledger_group_id` int(11) NOT NULL,
  `ledger_from` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `state` smallint(6) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gstin` varchar(20) DEFAULT NULL,
  `registration_type` int(11) NOT NULL,
  `pan` varchar(20) DEFAULT NULL,
  `gst_applicable` enum('0','1') NOT NULL DEFAULT '0',
  `tds_applicable` enum('0','1') NOT NULL DEFAULT '0',
  `tax_rate` decimal(10,2) NOT NULL,
  `tds_rate` decimal(10,2) NOT NULL,
  `opening_balance` decimal(15,2) DEFAULT NULL,
  `opening_balance_type` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 credit | 1 debit',
  `balance_as_on_date` varchar(40) DEFAULT NULL,
  `beneficiary` varchar(100) DEFAULT NULL,
  `ac_number` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created_by` smallint(6) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ledger_group`
--

CREATE TABLE `ledger_group` (
  `ledger_group_id` int(11) NOT NULL,
  `ledger_group_name` varchar(100) NOT NULL,
  `parent_ledger_group_id` int(11) NOT NULL,
  `ledger_group_type_id` smallint(6) NOT NULL,
  `ledger_group_balance` decimal(10,2) NOT NULL,
  `status_id` enum('0','1') NOT NULL DEFAULT '1',
  `created_by` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ledger_group_type`
--

CREATE TABLE `ledger_group_type` (
  `ledger_group_type_id` int(11) NOT NULL,
  `ledger_group_type_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `module_id` int(11) NOT NULL,
  `module_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `company` int(11) NOT NULL,
  `users` int(11) NOT NULL,
  `site` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_details`
--

CREATE TABLE `purchase_details` (
  `purchase_details_id` int(11) NOT NULL,
  `purchase_ledger_id` varchar(100) DEFAULT NULL,
  `purchase_date` varchar(100) DEFAULT NULL,
  `purchase_account` varchar(100) DEFAULT NULL,
  `gst_applicable` varchar(10) DEFAULT NULL,
  `creditor_id` int(11) DEFAULT NULL,
  `creditor_name` varchar(255) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `gstin` varchar(20) DEFAULT NULL,
  `supplier_invoice_no` varchar(100) DEFAULT NULL,
  `receipt_note_no` varchar(100) DEFAULT NULL,
  `receipt_doc_no` varchar(100) DEFAULT NULL,
  `receipt_date` varchar(100) DEFAULT NULL,
  `dispatched_through` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `carrier_name` varchar(100) DEFAULT NULL,
  `vehicle_no` varchar(50) DEFAULT NULL,
  `lr_rr_no` varchar(100) DEFAULT NULL,
  `lr_rr_date` date DEFAULT NULL,
  `bill_of_entry_no` varchar(100) DEFAULT NULL,
  `bill_of_entry_date` date DEFAULT NULL,
  `port_code` varchar(50) DEFAULT NULL,
  `subtotal` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_item_details`
--

CREATE TABLE `purchase_item_details` (
  `purchase_item_details_id` int(11) NOT NULL,
  `purchase_details_id` int(11) DEFAULT NULL,
  `stock_items_id` int(11) DEFAULT NULL,
  `cth` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `uqc` varchar(100) DEFAULT NULL,
  `stock_name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `gst_rate` int(11) DEFAULT NULL,
  `gst_amount` decimal(12,2) DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_item_other_charges`
--

CREATE TABLE `purchase_item_other_charges` (
  `purchase_item_other_charges_id` int(11) NOT NULL,
  `purchase_details_id` int(11) DEFAULT NULL,
  `ledger_name` varchar(255) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `site_id` int(11) NOT NULL,
  `site_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_address1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_address2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_pin_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_state_id` smallint(6) NOT NULL,
  `site_contact_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_contact_no` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL,
  `site_status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `state_details`
--

CREATE TABLE `state_details` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(255) NOT NULL,
  `state_code` varchar(255) NOT NULL,
  `state_code_id` int(11) NOT NULL,
  `state_type` varchar(11) NOT NULL COMMENT 'ST:2, UT',
  `country` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_category`
--

CREATE TABLE `stock_category` (
  `stock_category_id` int(11) NOT NULL,
  `stock_category_name` varchar(255) NOT NULL,
  `stock_category_parent_id` int(11) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created_by` smallint(6) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_group`
--

CREATE TABLE `stock_group` (
  `stock_group_id` int(11) NOT NULL,
  `stock_group_name` varchar(255) NOT NULL,
  `parent_stock_group_id` int(11) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created_by` smallint(6) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_items`
--

CREATE TABLE `stock_items` (
  `stock_items_id` int(11) NOT NULL,
  `stock_items_name` varchar(255) NOT NULL,
  `stock_group_id` int(11) NOT NULL,
  `stock_category_id` int(11) NOT NULL,
  `stock_unit` varchar(100) NOT NULL,
  `stock_description` varchar(255) DEFAULT NULL,
  `stock_hsn_code` varchar(100) NOT NULL,
  `gst_rate` int(11) NOT NULL,
  `stock_supply` varchar(100) NOT NULL,
  `opening_stock` int(11) DEFAULT NULL,
  `opening_stock_date` varchar(100) DEFAULT NULL,
  `opening_balance` decimal(10,2) NOT NULL,
  `opening_balance_date` varchar(100) DEFAULT NULL,
  `rate` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created_by` smallint(6) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` smallint(6) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `subscription_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL,
  `status` smallint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `transaction_details_id` int(11) NOT NULL,
  `ref_id` int(11) DEFAULT NULL,
  `ref_type` varchar(50) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `ref_batch` varchar(50) DEFAULT NULL,
  `stock_items_id` int(11) DEFAULT NULL,
  `qty` decimal(10,2) DEFAULT NULL,
  `rate` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_access`
--

CREATE TABLE `user_access` (
  `access_id` int(11) NOT NULL,
  `user_id` smallint(6) DEFAULT NULL,
  `module_id` smallint(6) DEFAULT NULL,
  `role_id` smallint(6) DEFAULT NULL,
  `site_id` smallint(6) DEFAULT NULL,
  `created_by` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company_details`
--
ALTER TABLE `company_details`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`invoice_details_id`);

--
-- Indexes for table `invoice_item_details`
--
ALTER TABLE `invoice_item_details`
  ADD PRIMARY KEY (`invoice_item_details_id`);

--
-- Indexes for table `ledger`
--
ALTER TABLE `ledger`
  ADD PRIMARY KEY (`ledger_id`);

--
-- Indexes for table `ledger_group`
--
ALTER TABLE `ledger_group`
  ADD PRIMARY KEY (`ledger_group_id`);

--
-- Indexes for table `ledger_group_type`
--
ALTER TABLE `ledger_group_type`
  ADD PRIMARY KEY (`ledger_group_type_id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `purchase_details`
--
ALTER TABLE `purchase_details`
  ADD PRIMARY KEY (`purchase_details_id`);

--
-- Indexes for table `purchase_item_details`
--
ALTER TABLE `purchase_item_details`
  ADD PRIMARY KEY (`purchase_item_details_id`);

--
-- Indexes for table `purchase_item_other_charges`
--
ALTER TABLE `purchase_item_other_charges`
  ADD PRIMARY KEY (`purchase_item_other_charges_id`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`site_id`);

--
-- Indexes for table `state_details`
--
ALTER TABLE `state_details`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `stock_category`
--
ALTER TABLE `stock_category`
  ADD PRIMARY KEY (`stock_category_id`);

--
-- Indexes for table `stock_group`
--
ALTER TABLE `stock_group`
  ADD PRIMARY KEY (`stock_group_id`);

--
-- Indexes for table `stock_items`
--
ALTER TABLE `stock_items`
  ADD PRIMARY KEY (`stock_items_id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`subscription_id`);

--
-- Indexes for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`transaction_details_id`);

--
-- Indexes for table `user_access`
--
ALTER TABLE `user_access`
  ADD PRIMARY KEY (`access_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company_details`
--
ALTER TABLE `company_details`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `invoice_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_item_details`
--
ALTER TABLE `invoice_item_details`
  MODIFY `invoice_item_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ledger`
--
ALTER TABLE `ledger`
  MODIFY `ledger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ledger_group`
--
ALTER TABLE `ledger_group`
  MODIFY `ledger_group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ledger_group_type`
--
ALTER TABLE `ledger_group_type`
  MODIFY `ledger_group_type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_details`
--
ALTER TABLE `purchase_details`
  MODIFY `purchase_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_item_details`
--
ALTER TABLE `purchase_item_details`
  MODIFY `purchase_item_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_item_other_charges`
--
ALTER TABLE `purchase_item_other_charges`
  MODIFY `purchase_item_other_charges_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `site_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `state_details`
--
ALTER TABLE `state_details`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_category`
--
ALTER TABLE `stock_category`
  MODIFY `stock_category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_group`
--
ALTER TABLE `stock_group`
  MODIFY `stock_group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_items`
--
ALTER TABLE `stock_items`
  MODIFY `stock_items_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `subscription_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `transaction_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_access`
--
ALTER TABLE `user_access`
  MODIFY `access_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
