import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const FormCourse = ({ students, onSave, onCancel, isEditing, selectedCourse }) => {
    const [courseName, setCourseName] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        if (isEditing && selectedCourse) {
            setCourseName(selectedCourse.courseName || '');
            setSelectedStudents(selectedCourse.studentIds || []);
        }
    }, [isEditing, selectedCourse]);

    const handleSave = () => {
        const formData = {
            courseName,
            studentIds: selectedStudents,
        };
        onSave(formData);
    };

    const handleSelectStudent = (studentId) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        } else {
            setSelectedStudents([...selectedStudents, studentId]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Course Name:</Text>
                <TextInput
                    style={styles.input}
                    value={courseName}
                    onChangeText={setCourseName}
                />
                <Text style={styles.label}>Enrolled Students:</Text>
                {students.map(student => (
                    <TouchableOpacity
                        key={student.id}
                        style={[
                            styles.studentItem,
                            selectedStudents.includes(student.id) && styles.selectedStudent,
                        ]}
                        onPress={() => handleSelectStudent(student.id)}
                    >
                        <Text>{student.name}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    selectedStudent: {
        backgroundColor: 'lightblue',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 4,
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default FormCourse;
