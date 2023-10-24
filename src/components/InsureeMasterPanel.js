import React, { Component, Fragment } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Divider, Checkbox, FormControlLabel } from "@material-ui/core";
import {
  formatMessage,
  withTooltip,
  FormattedMessage,
  PublishedComponent,
  FormPanel,
  TextInput,
  Contributions,
  withModulesManager,
  ConstantBasedPicker,
} from "@openimis/fe-core";
import {YES_NO} from "../constants";
import moment from "moment";

const styles = (theme) => ({
  paper: theme.paper.paper,
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: "100%",
  },
});

const INSUREE_INSUREE_CONTRIBUTION_KEY = "insuree.Insuree";
const INSUREE_INSUREE_PANELS_CONTRIBUTION_KEY = "insuree.Insuree.panels";

class InsureeMasterPanel extends FormPanel {

  updateExts = (updates) => {
    let data = { ...this.state.data };
    if (data["jsonExt"] === undefined) {
      data["jsonExt"] = updates;
    } else {
      data["jsonExt"] = { ...data["jsonExt"], ...updates };
    }
    this.props.onEditedChanged(data);
  };

  render() {
    const {
      intl,
      classes,
      edited,
      title = "Insuree.title",
      titleParams = { label: "" },
      readOnly = true,
      actions,
      edited_id,
    } = this.props;

    console.log("*** edited = ", edited);

    let ageYears = null;
    let ageMonths = null;
    let ageDays = null;
    if (!!edited && !!edited.dob) {
      const now = moment();
      const dob = moment(edited.dob);
      ageYears = now.diff(dob, "years");
      ageMonths = now.diff(dob, "months");
      if (ageMonths > 24) {
        ageMonths = null;
      }
      ageDays = now.diff(dob, "days");
      if (ageDays > 60) {
        ageDays = null;
      }
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container className={classes.tableTitle}>
              <Grid item xs={3} container alignItems="center" className={classes.item}>
                <Typography variant="h5">
                  <FormattedMessage module="insuree" id={title} values={titleParams} />
                </Typography>
              </Grid>
{/*
              <Grid item xs={9}>
                <Grid container justify="flex-end">
                  {!!edited &&
                    !!edited.family &&
                    !!edited.family.headInsuree &&
                    edited.family.headInsuree.id !== edited.id && (
                      <Grid item xs={3}>
                        <PublishedComponent
                          pubRef="insuree.RelationPicker"
                          withNull={true}
                          nullLabel={formatMessage(this.props.intl, "insuree", `Relation.none`)}
                          readOnly={readOnly}
                          value={!!edited && !!edited.relationship ? edited.relationship.id : ""}
                          onChange={(v) => this.updateAttribute("relationship", { id: v })}
                        />
                      </Grid>
                    )}
                  {!!actions &&
                    actions.map((a, idx) => {
                      return (
                        <Grid item key={`form-action-${idx}`} className={classes.paperHeaderAction}>
                          {withTooltip(a.button, a.tooltip)}
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
*/}
            </Grid>
            <Divider />
            <Grid container className={classes.item}>
              <Grid item xs={4} className={classes.item}>
                <PublishedComponent
                  pubRef="insuree.InsureeNumberInput"
                  module="insuree"
                  label="Insuree.chfId"
                  // required={true}
                  readOnly={true}
                  value={edited?.chfId}
                  edited_id={edited_id}
                  onChange={(v) => this.updateAttribute("chfId", v)}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={5} className={classes.item}>
                <TextInput
                  module="insuree"
                  label="Insuree.lastName"
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.lastName ? edited.lastName : ""}
                  onChange={(v) => this.updateAttribute("lastName", v)}
                />
              </Grid>
              <Grid item xs={3} className={classes.item}>
                <PublishedComponent
                  pubRef="insuree.InsureeGenderPicker"
                  value={!!edited && !!edited.gender ? edited.gender.code : ""}
                  module="insuree"
                  readOnly={readOnly}
                  withNull={true}
                  required={true}
                  onChange={(v) => this.updateAttribute("gender", { code: v })}
                />
              </Grid>

{/*
              <Grid item xs={4} className={classes.item}>
                <TextInput
                  module="insuree"
                  label="Insuree.otherNames"
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.otherNames ? edited.otherNames : ""}
                  onChange={(v) => this.updateAttribute("otherNames", v)}
                />
              </Grid>
*/}
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                      pubRef="core.DatePicker"
                      value={!!edited ? edited.dob : null}
                      module="insuree"
                      label="Insuree.dob"
                      readOnly={readOnly}
                      required={true}
                      maxDate={new Date()}
                      onChange={(v) => this.updateAttribute("dob", v)}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.item}>
                    <TextInput
                      module="insuree"
                      label="Insuree.ageYears"
                      required={false}
                      readOnly={readOnly}
                      value={!!edited && ageYears ? ageYears : ""}
                      type="number"
                      onBlur={(e) => {
                        const v = e.target.valueAsNumber;
                        if (!isNaN(v)) {
                          const approxDateOfBirth = moment().subtract(v, 'years').format('YYYY-MM-DD');
                          this.updateAttribute("dob", approxDateOfBirth)
                          // return this.updateExts({dob_is_approx: true});
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.item}>
                    <TextInput
                      module="insuree"
                      label="Insuree.ageMonths"
                      required={false}
                      readOnly={readOnly}
                      value={!!edited && ageMonths ? ageMonths : ""}
                      type="number"
                      onBlur={(e) => {
                        const v = e.target.valueAsNumber;
                        if (!isNaN(v)) {
                          const approxDateOfBirth = moment().subtract(v, 'months').format('YYYY-MM-DD');
                          return this.updateAttributes({"dob": approxDateOfBirth});
                          // return this.updateExts({dob_is_approx: true});
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.item}>
                    <TextInput
                      module="insuree"
                      label="Insuree.ageDays"
                      required={false}
                      readOnly={readOnly}
                      value={!!edited && ageDays ? ageDays : ""}
                      type="number"
                      onBlur={(e) => {
                        const v = e.target.valueAsNumber;
                        if (!isNaN(v)) {
                          const approxDateOfBirth = moment().subtract(v, 'days').format('YYYY-MM-DD');
                          return this.updateAttributes({"dob": approxDateOfBirth});
                          // return this.updateExts({dob_is_approx: true});
                        }
                      }}
                    />
                  </Grid>
{/*
                  <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                      pubRef="insuree.InsureeMaritalStatusPicker"
                      value={!!edited && !!edited.marital ? edited.marital : ""}
                      module="insuree"
                      readOnly={readOnly}
                      withNull={true}
                      nullLabel="InsureeMaritalStatus.N"
                      onChange={(v) => this.updateAttribute("marital", v)}
                    />
                  </Grid>
                  <Grid item xs={3} className={classes.item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={!!edited && !!edited.cardIssued}
                          disabled={readOnly}
                          onChange={(v) => this.updateAttribute("cardIssued", !edited || !edited.cardIssued)}
                        />
                      }
                      label={formatMessage(intl, "insuree", "Insuree.cardIssued")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PublishedComponent
                      pubRef="insuree.InsureeAddress"
                      value={edited}
                      module="insuree"
                      readOnly={readOnly}
                      onChangeLocation={(v) => this.updateAttribute("currentVillage", v)}
                      onChangeAddress={(v) => this.updateAttribute("currentAddress", v)}
                    />
                  </Grid>
*/}
                  <Grid item xs={3} className={classes.item}>
                    <TextInput
                      module="insuree"
                      label="Insuree.phone"
                      readOnly={readOnly}
                      value={!!edited && !!edited.phone ? edited.phone : ""}
                      onChange={(v) => this.updateAttribute("phone", v)}
                    />
                  </Grid>
                  <Divider />
                  <Grid item xs={3} className={classes.item}>
                    <ConstantBasedPicker
                        module="insuree"
                        label="Family.rural"
                        required
                        onChange={(value) =>
                          this.updateExts({rural: value})
                        }
                        constants={YES_NO}
                        withNull
                        value={!!edited && !!edited.jsonExt && edited.jsonExt.rural}
                      />
                  </Grid>
                  <Grid item xs={3} className={classes.item}>
                    <ConstantBasedPicker
                        module="insuree"
                        label="Family.idp"
                        required
                        onChange={(value) =>
                          this.updateExts({idp: value})
                        }
                        constants={YES_NO}
                        withNull
                        value={!!edited && !!edited.jsonExt && edited.jsonExt.idp}
                      />
                  </Grid>
                  <Grid item xs={3} className={classes.item}>
                    <ConstantBasedPicker
                        module="insuree"
                        label="Family.vulnerable"
                        required
                        onChange={(value) =>
                          this.updateExts({vulnerable: value})
                        }
                        constants={YES_NO}
                        withNull
                        value={!!edited && !!edited.jsonExt && edited.jsonExt.vulnerable}
                      />
                  </Grid>
                  <Grid item xs={3} className={classes.item}>
                    <ConstantBasedPicker
                        module="insuree"
                        required
                        label="Family.disability"
                        onChange={(value) =>
                          this.updateExts({disability: value})
                        }
                        constants={YES_NO}
                        withNull
                        value={!!edited && !!edited.jsonExt && edited.jsonExt.disability}
                      />
                  </Grid>

                </Grid>
              </Grid>
{/*              <Grid item xs={4} className={classes.item}>
                <PublishedComponent
                  pubRef="insuree.Avatar"
                  photo={!!edited ? edited.photo : null}
                  readOnly={readOnly}
                  withMeta={true}
                  onChange={(v) => this.updateAttribute("photo", !!v ? v : null)}
                />
              </Grid>
*/}
              <Contributions
                {...this.props}
                updateAttribute={this.updateAttribute}
                contributionKey={INSUREE_INSUREE_CONTRIBUTION_KEY}
              />
            </Grid>
          </Paper>
          <Contributions
            {...this.props}
            updateAttribute={this.updateAttribute}
            contributionKey={INSUREE_INSUREE_PANELS_CONTRIBUTION_KEY}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withModulesManager(withTheme(withStyles(styles)(InsureeMasterPanel)));
