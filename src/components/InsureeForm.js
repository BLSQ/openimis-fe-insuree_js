import React, { Component, Fragment } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Divider, Checkbox, FormControlLabel } from "@material-ui/core";
import {
    formatMessage,
    FormattedMessage, PublishedComponent,
    TextInput
} from "@openimis/fe-core";

const styles = theme => ({
    paper: theme.paper.paper,
    tableTitle: theme.table.title,
    item: theme.paper.item,
});

class InsureeForm extends Component {
    render() {
        const {
            intl, classes, edited,
            title = "insuree.InsureeForm.title", titleParams = {},
            readOnly = true, updateAttribute
        } = this.props;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.tableTitle}>
                            <FormattedMessage module="insuree" id={title} values={titleParams} />
                        </Typography>
                        <Divider />
                        <Grid container className={classes.item}>
                            <Grid item xs={4} className={classes.item}>
                                <TextInput
                                    module="insuree"
                                    label="Insuree.chfId"
                                    required={true}
                                    readOnly={readOnly}
                                    value={!!edited && !!edited.chfId ? edited.chfId : ""}
                                    onChange={v => updateAttribute('chfId', v)}
                                />
                            </Grid>
                            <Grid item xs={4} className={classes.item}>
                                <TextInput
                                    module="insuree"
                                    label="Insuree.lastName"
                                    required={true}
                                    readOnly={readOnly}
                                    value={!!edited && !!edited.lastName ? edited.lastName : ""}
                                    onChange={v => updateAttribute('lastName', v)}
                                />
                            </Grid>
                            <Grid item xs={4} className={classes.item}>
                                <TextInput
                                    module="insuree"
                                    label="Insuree.otherNames"
                                    required={true}
                                    readOnly={readOnly}
                                    value={!!edited && !!edited.otherNames ? edited.otherNames : ""}
                                    onChange={v => updateAttribute('otherNames', v)}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="core.DatePicker"
                                            value={!!edited ? edited.dob : null}
                                            module="insuree"
                                            label="Insuree.dob"
                                            readOnly={readOnly}
                                            required={true}
                                            onChange={v => updateAttribute('dob', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="insuree.InsureeGenderPicker"
                                            value={!!edited && !!edited.gender ? edited.gender.code : ""}
                                            module="insuree"
                                            readOnly={readOnly}
                                            withNull={true}
                                            nullLabel={formatMessage(intl, "insuree", "InsureeGender.none")}
                                            onChange={v => updateAttribute('gender', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="insuree.InsureeMaritalStatusPicker"
                                            value={!!edited && !!edited.marital ? edited.marital : ""}
                                            module="insuree"
                                            readOnly={readOnly}
                                            withNull={true}
                                            nullLabel="InsureeMaritalStatus.N"
                                            onChange={v => updateAttribute('marital', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                color="primary"
                                                checked={!!edited && !!edited.card_issued}
                                                disabled={readOnly}
                                                onChange={v => updateAttribute('card_issued', !edited || !edited.card_issued)}
                                            />}
                                            label={formatMessage(intl, "insuree", "Insuree.cardIssued")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PublishedComponent pubRef="insuree.InsureeAddress"
                                            value={edited}
                                            module="insuree"
                                            readOnly={readOnly}
                                            onChangeLocation={v => updateAttribute('location', v)}
                                            onChangeAddress={v => updateAttribute('address', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className={classes.item}>
                                        <TextInput
                                            module="insuree"
                                            label="Insuree.phone"
                                            readOnly={readOnly}
                                            value={!!edited && !!edited.phone ? edited.phone : ""}
                                            onChange={v => updateAttribute('phone', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className={classes.item}>
                                        <TextInput
                                            module="insuree"
                                            label="Insuree.email"
                                            readOnly={readOnly}
                                            value={!!edited && !!edited.email ? edited.email : ""}
                                            onChange={v => updateAttribute('email', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="insuree.ProfessionPicker"
                                            module="insuree"
                                            value={!!edited && !!edited.profession ? edited.profession.id : null}
                                            readOnly={readOnly}
                                            withNull={true}
                                            nullLabel={formatMessage(intl, "insuree", "Profession.none")}
                                            onChange={v => updateAttribute('profession', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="insuree.EducationPicker"
                                            module="insuree"
                                            value={!!edited && !!edited.education ? edited.education.id : ""}
                                            readOnly={readOnly}
                                            withNull={true}
                                            nullLabel={formatMessage(intl, "insuree", "insuree.Education.none")}
                                            onChange={v => updateAttribute('education', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="insuree.IdentificationTypePicker"
                                            module="insuree"
                                            value={!!edited && !!edited.typeOfId ? edited.typeOfId : ""}
                                            readOnly={readOnly}
                                            withNull={true}
                                            nullLabel={formatMessage(intl, "insuree", "IdentificationType.none")}
                                            onChange={v => updateAttribute('typeOfId', v)}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <TextInput
                                            module="insuree"
                                            label="Insuree.passport"
                                            readOnly={readOnly}
                                            value={!!edited && !!edited.passport ? edited.passport : ""}
                                            onChange={v => updateAttribute('passport', !!v ? v : null)}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={4} className={classes.item}>
                                <PublishedComponent pubRef="insuree.Avatar"
                                    insuree={edited}
                                    readOnly={readOnly}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withTheme(
    withStyles(styles)(InsureeForm)
);