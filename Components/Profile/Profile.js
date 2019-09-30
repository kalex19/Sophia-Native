import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from './styles';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';

const initialState = {
	username: '',
	password: '',
	street_address: '',
	city: '',
	state: '',
	zip: '',
	allergies: '',
	needs: '',
	diet_restrictions: '',
	medications: '',
	abilities: '',
	displayEdit: false
};

export class Profile extends Component {
	state = initialState;

	toggleEdit = () => {
		this.setState({ displayEdit: !this.state.displayEdit });
	};

	handleEdit = value => {
		this.setState({ [name]: value });
	};

	handleSubmitEdit = async listId => {
		const { user } = this.props;
		if (this.props.user.role === 'client') {
			const updatedProfile = {
				username: this.state.username,
				password: this.state.password,
				street_address: this.state.street_address,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
				allergies: this.state.allergies,
				needs: this.state.needs,
				diet_restrictions: this.state.diet_restrictions,
				medications: this.state.medications,
				list_id: listId,
				client_id: user.id
			};
			await patchClientList(updatedProfile);
		} else {
			const updatedProfile = {
				username: this.state.username,
				password: this.state.password,
				abilities: this.state.abilities
			};
			await patchCaretakerList(updatedProfile);
		}
		this.returnUpdatedProfile();
		this.setState({ initialState });
	};
	renderClientInfo = () => {
		let allNeeds = this.props.user.needs.map(need => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{need}
				</Text>
			);
		});
		let allMedications = this.props.user.medications.map(med => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{med}
				</Text>
			);
		});
		let allAllergies = this.props.user.allergies.map(allergy => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{allergy}
				</Text>
			);
		});
		let allRestrictions = this.props.user.diet_restrictions.map(restr => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{restr}
				</Text>
			);
		});
		return (
			<View>
				<View style={styles.addressContainer}>
					<Text style={styles.userInfo}>{this.props.user.address}</Text>
					<Text style={styles.userInfo}>{this.props.user.city}</Text>
					<Text style={styles.userInfo}>{this.props.user.state}</Text>
					<Text style={styles.userInfo}>{this.props.user.zip}</Text>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Needs:</Text>
					{allNeeds}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Allergies: </Text>
					{allAllergies}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Dietary Restrictions: </Text>
					{allRestrictions}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Medications:</Text>
					{allMedications}
				</View>
			</View>
		);
	};

	renderCaretakerInfo = () => {
		let allAbilities = this.props.user.abilities.map(ablility => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{ability}
				</Text>
			);
		});
		return (
			<View style={styles.infoContainer}>
				<Text style={styles.userInfo}>Abilities:</Text>
				{allAbilities}
			</View>
		);
	};

	renderEditButton() {
		if (!this.state.displayEdit) {
			return (
				<Button accessibilityLabel="Tap me to edit your profile." onPress={() => this.toggleEditName(list.id)}>
					Edit Profile
				</Button>
			);
		}
		return (
			<Button accessibilityLabel="Tap me to submit your edited profile." onPress={() => this.handleSubmitEdit(list.id)}>
				Save Profile
			</Button>
		);
	}

	render() {
		return (
			<View>
				<Header>My Profile</Header>
				<image src="../assets/stockFace.jpg" style={styles.image}></image>
				<Text style={styles.userInfo}> {this.props.user.name}</Text>
				{this.state.displayEdit !== list.id && (
					<Button accessibilityLabel="Tap me to edit your profile." onPress={() => navigation.navigate('EditProfile')}>
						Edit Profile
					</Button>
				)}
				;
				<ScrollView style={styles.container}>
					<Text style={styles.userInfo}>Username: {this.props.user.username}</Text>
					<Text style={styles.userInfo}>Email: {this.props.user.email}</Text>
					{this.props.user.role === 'client' && this.renderClientInfo()}
					{this.props.user.role === 'caretaker' && this.renderCaretakerInfo()}
					{/* change the logic so both can't show */}
					<View style={{ height: 150 }}></View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	user: state.userAccount
});

const mapDispatchToProps = dispatch => ({});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

Profile.propTypes = {
	userAccount: PropTypes.object
};
