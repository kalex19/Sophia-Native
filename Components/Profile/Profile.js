import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from './styles';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';
import Input from '../common/Input/Input';

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
			return <Input style={styles.userInfoList} key={Math.random()} name="needs" value={need} />;
		});
		let allMedications = this.props.user.medications.map(med => {
			return <Input style={styles.userInfoList} key={Math.random()} name="medications" value={med} />;
		});
		let allAllergies = this.props.user.allergies.map(allergy => {
			return <Input style={styles.userInfoList} key={Math.random()} name="allergies" value={allergy} />;
		});
		let allRestrictions = this.props.user.diet_restrictions.map(restr => {
			return <Input style={styles.userInfoList} key={Math.random()} name="diet_restrictions" value={restr} />;
		});
		return (
			<View>
				<View style={styles.addressContainer}>
					<Input style={styles.userInfo} name="street_address" value={this.props.user.address} />
					<Input style={styles.userInfo} name="city" value={this.props.user.city} />
					<Input style={styles.userInfo} name="state" value={this.props.user.state} />
					<Input style={styles.userInfo} name="zip" value={this.props.user.zip} />
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
				<Input style={styles.userInfoList} key={Math.random()} name="abilities" value={this.props.user.abilties} />
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
				<ScrollView style={styles.container}>
					<Image source="../assets/stockFace.jpg" style={styles.image} />
					<Text style={{ ...styles.userInfo, borderColor: 'red', borderWidth: 1 }}>{this.props.user.name}</Text>
					{this.renderEditButton()}
					<Input style={styles.userInfo}>Username: {this.props.user.username}</Input>
					<Input style={styles.userInfo}>Email: {this.props.user.email}</Input>
					<Input style={styles.userInfo}>Phone Number: {this.props.user.phone_number}</Input>
					{this.props.user.role === 'client' && this.renderClientInfo()}
					{this.props.user.role === 'caretaker' && this.renderCaretakerInfo()}
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
