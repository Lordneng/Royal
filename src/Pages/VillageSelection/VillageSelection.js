import React, { Component } from 'react';
import './VillageSelection.css';
import Title from '../../Components/Title/Title';
import { Grid, Typography } from '@material-ui/core';
import Provinces from '../../Data/Province.json';
import EachProvince from '../../Data/Config.json';
import VillageList from '../../Components/VillageList/VillageList';
import * as firebase from 'firebase/app';

class VillageSelection extends Component {
    constructor() {
        super()
        this.state = {
            obj: {}
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref('Mastersheet');

        rootRef.on('value', (snap) => {
            console.log(snap.val());
            this.setState({
                obj: snap.val()
            });
            console.log(this.state.obj);
        });
    }

    render() {
        let amphoeOrKet = 'อำเภอ';
        let tambonOrKwang = 'ตำบล';
        let storeProvince = "";

        const selectedRegion = Provinces.filter(region => region.name.match(this.props.match.params.region));
        selectedRegion.map(regionProvince => {
            regionProvince.list.map(item => {
                if (item.english === this.props.match.params.province) {
                    storeProvince = item.thai;
                }
                return (null);
            });
            return (null);
        });

        const filteredProvince = EachProvince.filter(eachProvince => eachProvince.province.includes(storeProvince));
        console.log(storeProvince);
        console.log(filteredProvince);

        return (
            <div>
                <Title TitleHeading={filteredProvince[0].province} />
                {
                    Object.entries(this.state.obj).map((item) => {
                        // console.log('key is:- ', item[0], ' and value is:- ', item[1]); 
                        if (item[1].Province === filteredProvince[0].province) {
                            if (filteredProvince[0].province.match("กรุงเทพมหานคร")){
                                amphoeOrKet = "เขต";
                                tambonOrKwang = "แขวง";
                            }

                            filteredProvince[0].amphoe.map((amphoe) => {
                                return (
                                    <div>
                                        {
                                            Object.entries(this.state.obj).map((item) => {
                                                // console.log('key is:- ', item[0], ' and value is:- ', item[1]); 
                                                if (item[1].District === amphoe.name) {
                                                    console.log(item[1].District);
                                                    return (
                                                        <div>
                                                            <Typography variant="h5">{amphoeOrKet + item[1].District}</Typography>
                                                            {
                                                                amphoe.tambon.map(tambon => {
                                                                    if (tambon === item[1].SubDistrict)
                                                                    {
                                                                        console.log(tambon)
                                                                        console.log(item[1].SubDistrict)
                                                                        console.log(item[1].Building)
                                                                        console.log(item[1].District)
                                                                      
                                                                        return (
                                                                            <Grid container spacing={1}>
                                                                                <div className="villageSelection__padding">
                                                                                    <VillageList VillageName={item[1].Building} VillageTambon={tambonOrKwang + item[1].District} VillageAmphoe={amphoeOrKet + item[1].SubDistrict} />
                                                                                </div>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                    return(null);
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }
                                                return(null);
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        return(null);
                    })
                }
            </div>
        );
    }
}

export default VillageSelection;



