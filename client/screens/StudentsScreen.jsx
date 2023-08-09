import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import Form from '../components/Form';
import { BASE_URL } from '../server';

const StudentsScreen = () => {
    const [students, setStudents] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({ name: '', dateOfBirth: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/students`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/students/${id}`);
            const student = response.data;

            await axios.delete(`${BASE_URL}/students/${id}`);

            const courseIds = student.courseIds || [];
            for (const courseId of courseIds) {
                const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
                const course = response.data;

                const updatedStudentIds = course.studentIds.filter(studentId => studentId !== id);
                await axios.put(`${BASE_URL}/courses/${courseId}`, {
                    ...course,
                    studentIds: updatedStudentIds
                });
            }

            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };


    const handleEdit = (item) => {
        setModalData({ id: item.id, name: item.name, dateOfBirth: new Date(item.dateOfBirth) });
        setModalVisible(true);
    };

    const handleAdd = () => {
        setModalData({ name: '', dateOfBirth: new Date() });
        setModalVisible(true);
    };

    const handleSave = async (formData) => {
        if (formData.name && formData.dateOfBirth) {
            try {
                const formattedDateOfBirth = formatDateForServer(formData.dateOfBirth);

                if (formData.id) {
                    await axios.put(
                        `${BASE_URL}/students/${formData.id}`,
                        { ...formData, dateOfBirth: formattedDateOfBirth }
                    );
                } else {
                    await axios.post(
                        `${BASE_URL}/students`,
                        { ...formData, dateOfBirth: formattedDateOfBirth }
                    );
                }
                fetchStudents();
                setModalVisible(false);
            } catch (error) {
                console.error('Error saving student:', error);
            }
        }
    };

    const formatDateForServer = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Student Information:</Text>
            <FlatList
                data={students}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.dateOfBirth}>Date of Birth: {item.dateOfBirth}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'red' }]}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'blue' }]}
                                onPress={() => handleEdit(item)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonLabel}>Add Student</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Form
                        onSave={handleSave}
                        initialValues={modalData}
                        title={modalData.id ? 'Edit Student' : 'Add Student'}
                    />
                    <View style={styles.modalButtons}>
                        <Button
                            title="Cancel"
                            onPress={() => {
                                setModalVisible(false);
                                setModalData({ name: '', dateOfBirth: '' });
                            }}
                            color="red"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateOfBirth: {
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    addButtonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default StudentsScreen;
