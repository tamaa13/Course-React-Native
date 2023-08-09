import React from 'react';
import { Modal, SafeAreaView, ScrollView, Text, View, Button, StyleSheet } from 'react-native';

const ModalDetail = ({ isVisible, course, students, onClose }) => {
    if (!isVisible || !course) {
        return null;
    }

    const enrolledStudents = course.studentIds.map(studentId => {
        const student = students.find(student => student.id === studentId);
        return student;
    });

    return (
        <Modal visible={isVisible} animationType="slide">
            <SafeAreaView style={styles.modalContainer}>
                <ScrollView style={styles.modalScrollView}>
                    <Text style={styles.modalTitle}>Course Detail</Text>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalValue}>{course.courseName}</Text>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalLabel}>Enrolled Students:</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeaderRow}>
                                <Text style={styles.tableHeader}>Name</Text>
                                <Text style={styles.tableHeader}>Date of Birth</Text>
                            </View>
                            {enrolledStudents.map(student => (
                                <View key={student?.id} style={styles.tableDataRow}>
                                    <Text style={styles.tableData}>{student?.name}</Text>
                                    <Text style={styles.tableData}>{student?.dateOfBirth}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Button title="Close" onPress={onClose} />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalScrollView: {
        flex: 1,
        padding: 16,
    },
    modalLabel: {
        fontSize: 18,
        marginBottom: 4,
        color: '#555',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalContent: {
        marginBottom: 16,
    },
    modalValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 8,
    },
    tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableDataRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    tableData: {
        flex: 1,
    },
});

export default ModalDetail;
