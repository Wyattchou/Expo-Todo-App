import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

export default function App() {

  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Walk the dog', completed: true },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (key) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTask.trim() === '') return; 
    const newKey = (tasks.length + 1).toString();
    setTasks([...tasks, { key: newKey, description: newTask, completed: false }]);
    setNewTask('');
  };

  const renderItem = ({ item }) => (
    <CheckBox
      title={
        <Text style={item.completed ? styles.completed : styles.text}>
          {item.description}
        </Text>
      }
      checked={item.completed}
      onPress={() => toggleTask(item.key)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO List</Text>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="New task..."
          value={newTask}
          onChangeText={setNewTask}
          containerStyle={{ flex: 1 }}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  text: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});