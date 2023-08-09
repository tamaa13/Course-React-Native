import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import ModalDetail from '../components/ModalDetail';
import FormCourse from '../components/FormCourse';
import { BASE_URL } from '../server';

const CoursesScreen = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalDetailVisible, setModalDetailVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/students`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/courses`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddStudent = () => {
        setSelectedCourse(null);
        setIsEditing(false);
        setModalVisible(true);
    };

    const handleEditCourse = (course) => {
        setSelectedCourse(course);
        setIsEditing(true);
        setModalVisible(true);
    };

    const handleDetailCourse = (course) => {
        fetchCourses();
        fetchStudents();
        setSelectedCourse(course);
        setModalDetailVisible(true);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`${BASE_URL}/courses/${courseId}`);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleFormSubmit = async (courseData) => {
        try {
            if (isEditing && selectedCourse) {
                await axios.put(
                    `${BASE_URL}/courses/${selectedCourse.id}`,
                    courseData
                );
            } else {
                await axios.post(`${BASE_URL}/courses`, courseData);
                fetchCourses();
                fetchStudents();
            }
            fetchCourses();
        } catch (error) {
            console.error('Error saving course:', error);
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.label}>Course Information:</Text>
            <FlatList
                data={courses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.courseItem}>
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseName}>{item.courseName}</Text>
                            <Text style={styles.enrollmentInfo}>
                                {item.studentIds.length > 0
                                    ? `Enrolled Students: ${item.studentIds.length}`
                                    : 'No Students Enrolled Yet'}
                            </Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => handleDeleteCourse(item.id)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.editButton]}
                                onPress={() => handleEditCourse(item)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.detailButton]}
                                onPress={() => handleDetailCourse(item)}
                            >
                                <Text style={styles.buttonText}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
                <Text style={styles.addButtonLabel}>Add Course</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FormCourse
                        course={selectedCourse}
                        students={students}
                        onSave={handleFormSubmit}
                        onCancel={() => setModalVisible(false)}
                        isEditing={isEditing}
                        selectedCourse={selectedCourse}
                    />
                </View>
            </Modal>
            <ModalDetail
                isVisible={isModalDetailVisible}
                course={selectedCourse}
                students={students}
                onClose={() => setModalDetailVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    courseItem: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseInfo: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    enrollmentInfo: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        marginRight: 8,
    },
    editButton: {
        backgroundColor: 'blue',
    },
    detailButton: {
        backgroundColor: 'green',
        marginLeft: 8,
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
        backgroundColor: 'white',
    },
});

export default CoursesScreen;
