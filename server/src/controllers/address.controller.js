import Address from "../models/Address.js";

// ===============================
// Add Address
// ===============================

export const addAddress = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
            isDefault,
        } = req.body;

        // If this address is default, remove default from others
        if (isDefault) {
            await Address.updateMany(
                { user: req.user._id },
                { isDefault: false }
            );
        }

        const address = await Address.create({
            user: req.user._id,
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
            isDefault,
        });

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            address,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Get All Addresses
// ===============================

export const getAddresses = async (req, res) => {
    try {

        const addresses = await Address.find({
            user: req.user._id,
        }).sort({ isDefault: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: addresses.length,
            addresses,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// ===============================
// Update Address
// ===============================

export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        const {
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
            isDefault,
        } = req.body;

        // Remove default from other addresses
        if (isDefault) {
            await Address.updateMany(
                {
                    user: req.user._id,
                    _id: { $ne: id },
                },
                {
                    isDefault: false,
                }
            );
        }

        address.fullName = fullName || address.fullName;
        address.phone = phone || address.phone;
        address.addressLine1 = addressLine1 || address.addressLine1;
        address.addressLine2 = addressLine2 || address.addressLine2;
        address.landmark = landmark || address.landmark;
        address.city = city || address.city;
        address.state = state || address.state;
        address.pincode = pincode || address.pincode;
        address.country = country || address.country;
        address.addressType = addressType || address.addressType;

        if (typeof isDefault !== "undefined") {
            address.isDefault = isDefault;
        }

        await address.save();

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Delete Address
// ===============================

export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        await address.deleteOne();

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Set Default Address
// ===============================

export const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        await Address.updateMany(
            { user: req.user._id },
            { isDefault: false }
        );

        address.isDefault = true;

        await address.save();

        res.status(200).json({
            success: true,
            message: "Default address updated",
            address,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};