import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export class CreateAccount extends Component {
	state = {
		user: ''
	};

	// handleChange = () => {
	//   this.setState({

	//   })
	// }

	// handleSubmit = () => {

	// }

	//    // handleSubmit = (newList) => {
	//   //   const { list_title } = this.state
	//   //   newList = { id: Date.now(), name: list_title, items:[] }
	//   //   this.props.addList(newList)
	//   //   this.clearInput();
	//   // }

	//   clearInput = () => {
	//     this.setState({

	//   })
	//   }

	render () {
		const ClientInput = (
			<View>
				<TextInput style={styles.input} placeholder="Username" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Password" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Your Name" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Street Address" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="City" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="State" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Zip Code" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Email" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Phone" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Caretaking Needs" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Allergies" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Dietary Restrictions" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Medications" onChangeText={this.handleChange} />
			</View>
		);

		const CaretakerInput = (
			<View>
				<TextInput style={styles.input} placeholder="Username" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Password" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Your Name" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Email" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Phone" onChangeText={this.handleChange} />
				<TextInput style={styles.input} placeholder="Caretaking Abilities" onChangeText={this.handleChange} />
			</View>
		);

		const ClientPageBtn = (
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor="black"
					accessibilityLabel="Tap me to create your client account."
					accessible={true}
					onPress={() => props.navigation.navigate('ClientHome')}>
					<Text style={styles.button}>Register as Client</Text>
				</TouchableHighlight>
			</View>
		);

		const CaretakerPageBtn = (
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor="black"
					accessibilityLabel="Tap me to create your caretaker account."
					accessible={true}
					onPress={() => props.navigation.navigate('CaretakerHome')}>
					<Text style={styles.button}>Register as Caretaker</Text>
				</TouchableHighlight>
			</View>
		);

		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Fill in the inputs to create an account">
						Create Account
					</Text>
				</View>
				<ScrollView>
					<Text>Are you a Client or Caretaker?</Text>
					<View style={styles.routes}>
						<TouchableHighlight
							underlayColor="black"
							accessibilityLabel="Tap me to create your client account."
							accessible={true}
							onPress={() => this.setState({ user: 'client' })}>
							<Text style={styles.button}>Client</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.routes}>
						<TouchableHighlight
							underlayColor="black"
							accessibilityLabel="Tap me to create your caretaker account."
							accessible={true}
							onPress={() => this.setState({ user: 'caretaker' })}>
							<Text style={styles.button}>Caretaker</Text>
						</TouchableHighlight>
					</View>
					{this.state.user === 'client' && ClientInput}
					{this.state.user === 'client' && ClientPageBtn}
					{this.state.user === 'caretaker' && CaretakerInput}
					{this.state.user === 'caretaker' && CaretakerPageBtn}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);

const styles = StyleSheet.create({
	headerContainer: {
		borderBottomColor: 'maroon',
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 40
	},
	header: {
		fontSize: 30,
		fontFamily: 'Didot'
	},
	greeting: {
		fontSize: 30,
		fontFamily: 'Didot',
		margin: 10,
		marginBottom: 30
	},
	button: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'Didot',
		textAlign: 'center'
	},
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: 'maroon',
		width: '80%',
		height: '20%',
		justifyContent: 'space-around',
		margin: 10
	}
});
