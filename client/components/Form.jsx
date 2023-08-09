import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Form = ({ onSave, initialValues, title }) => {
    const [name, setName] = useState(initialValues.name || '');
    const [dateOfBirth, setDateOfBirth] = useState(initialValues.dateOfBirth || '');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (event, selectedDate) => {
        hideDatePicker();
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handleSave = () => {
        const formData = {
            id: initialValues.id || null,
            name,
            dateOfBirth,
        };
        onSave(formData);
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.modalTitle}>{title}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <TouchableOpacity onPress={showDatePicker} style={styles.datePickerContainer}>
                    <Text style={styles.label}>Date of Birth:</Text>
                    <View style={styles.dateOfBirthContainer}>
                        <Text style={styles.dateOfBirthText}>{formatDate(dateOfBirth)}</Text>
                    </View>
                </TouchableOpacity>

                {isDatePickerVisible && (
                    <DateTimePicker
                        value={dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={handleConfirm}
                    />
                )}

                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
    },
    datePickerContainer: {
        marginBottom: 20,
    },
    dateOfBirthContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateOfBirthText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButtonContainer: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Form;