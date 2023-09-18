import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { formatMessage, SelectInput, withModulesManager } from "@openimis/fe-core";

class YesNoPicker extends Component {
  componentDidMount() {
    // if (!this.props.YesNos) {
    //   // prevent loading multiple times the cache when component is
    //   // several times on a page
    //   setTimeout(() => {
    //     !this.props.fetching && !this.props.fetched && this.props.fetchYesNos(this.props.modulesManager);
    //   }, Math.floor(Math.random() * 300));
    // }
  }

  nullDisplay = this.props.nullLabel || formatMessage(this.props.intl, "insuree", `YesNo.null`);

  formatSuggestion = (i) =>
    !!i ? `${formatMessage(this.props.intl, "insuree", `YesNo.${i}`)}` : this.nullDisplay;

  onSuggestionSelected = (v) => this.props.onChange(v, this.formatSuggestion(v));

  render() {
    const {
      intl,
      yesNos,
      module = "insuree",
      withLabel = true,
      label = "YesNoPicker.label",
      withPlaceholder = false,
      placeholder,
      value,
      reset,
      readOnly = false,
      required = false,
      withNull = false,
      nullLabel = null,
    } = this.props;
    let options = !!YesNos
      ? yesNos.map((v) => ({ value: v, label: this.formatSuggestion(v) }))
      : ['Y', 'N'];
    if (withNull) {
      options.unshift({ value: null, label: this.formatSuggestion(null) });
    }
    return (
      <SelectInput
        module={module}
        options={options}
        label={!!withLabel ? label : null}
        placeholder={
          !!withPlaceholder ? placeholder || formatMessage(intl, "insuree", "YesNoPicker.placehoder") : null
        }
        onChange={this.onSuggestionSelected}
        value={value}
        reset={reset}
        readOnly={readOnly}
        required={required}
        withNull={withNull}
        nullLabel={this.nullDisplay}
      />
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withModulesManager(YesNoPicker)));
