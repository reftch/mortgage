import {
  Button,
  Card,
  FormGroup,
  InputGroup,
  Menu,
  MenuItem,
  NumericInput,
  Popover,
  Section,
} from "@blueprintjs/core";
import { SyntheticEvent, useState } from "react";

export interface Grunderwerbsteuer {
  title: string;
  rate: number;
  rank: number;
  makler?: number;
}

const GRUNDERWERBSTEUER_LIST: Grunderwerbsteuer[] = [
  { title: "Baden-Württemberg", rate: 5.0, rank: 1, makler: 3.57 },
  { title: "Bayern", rate: 3.5, rank: 2, makler: 3.57 },
  { title: "Berlin", rate: 6.0, rank: 3, makler: 3.57 },
  { title: "Brandenburg", rate: 6.5, rank: 4, makler: 3.57 },
  { title: "Bremen", rate: 5.0, rank: 5, makler: 2.97 },
  { title: "Hamburg", rate: 5.5, rank: 6, makler: 3.12 },
  { title: "Hessen", rate: 6.0, rank: 7, makler: 2.97 },
  { title: "Mecklenburg-Vorprommen", rate: 6.0, rank: 8, makler: 2.97 },
  { title: "Niedersachsen", rate: 5.0, rank: 9, makler: 3.57 },
  { title: "Nordrhein-Westfalen", rate: 6.5, rank: 10, makler: 3.57 },
  { title: "Rheinland-Pfalz", rate: 5.0, rank: 11, makler: 3.57 },
  { title: "Saarland", rate: 6.5, rank: 12, makler: 3.57 },
  { title: "Sachsen", rate: 5.5, rank: 13, makler: 3.57 },
  { title: "Sachsen-Anhalt", rate: 5.0, rank: 14, makler: 3.57 },
  { title: "Schleswig-Holstein", rate: 6.5, rank: 15, makler: 3.57 },
  { title: "Thüringen", rate: 6.5, rank: 16, makler: 3.57 },
].map((f, index) => ({ ...f, rank: index + 1 }));

const UNSELECTED = {
  title: "Please select",
  rate: 0.0,
  rank: 0,
  makler: 0.0,
};

const DetailsData = ({ ...props }) => {
  // const [collapsed, setCollapsed] = useState(false);
  const [selectedGrunderwerbsteuer, setSelectedGrunderwerbsteuer] =
    useState<Grunderwerbsteuer>(GRUNDERWERBSTEUER_LIST[0]);
  const [selectedMakler, setSelectedMakler] =
    useState<Grunderwerbsteuer>(UNSELECTED);

  const handleNotaryFeesChange = (
    valueAsNumber: number,
    valueAsString: string
  ) => {
    console.debug(valueAsNumber);
    props.onChange({
      name: "notaryFees",
      value: Number(valueAsString),
    });
  };

  const handleLandEntryChange = (
    valueAsNumber: number,
    valueAsString: string
  ) => {
    console.debug(valueAsNumber);
    props.onChange({
      name: "landEntry",
      value: Number(valueAsString),
    });
  };

  const onChangeGrunderwerbsteuer = (e: SyntheticEvent, rank: number) => {
    e.preventDefault();
    setSelectedGrunderwerbsteuer(GRUNDERWERBSTEUER_LIST[rank - 1]);
    props.onChange({
      name: "landRegister",
      value: GRUNDERWERBSTEUER_LIST[rank - 1].rate,
    });
  };

  const grunderwerbsteuerMenu = (
    <Popover
      content={
        <Menu>
          {GRUNDERWERBSTEUER_LIST.map((g) => (
            <MenuItem
              key={g.rank}
              text={`${g.rank}. ${g.title}`}
              label={`${Number(g.rate).toFixed(1)}%`}
              onClick={(e) => onChangeGrunderwerbsteuer(e, g.rank)}
            />
          ))}
        </Menu>
      }
      disabled={false}
      placement="bottom-end"
    >
      <Button disabled={false} minimal={true} rightIcon="caret-down">
        {`${selectedGrunderwerbsteuer?.title}`}
      </Button>
    </Popover>
  );

  const onChangeMakler = (e: SyntheticEvent, rank: number) => {
    e.preventDefault();
    let makler: Grunderwerbsteuer = UNSELECTED;
    if (rank !== 0) {
      makler = GRUNDERWERBSTEUER_LIST[rank - 1];
    }

    setSelectedMakler(makler);
    props.onChange({
      name: "maklerProvision",
      value: makler.rate,
    });
  };

  const maklerProvisionMenu = (
    <Popover
      content={
        <Menu>
          <MenuItem
            key={UNSELECTED.rank}
            text={`${UNSELECTED.title}`}
            label={`${Number(UNSELECTED.makler).toFixed(2)}%`}
            onClick={(e) => onChangeMakler(e, 0.0)}
          />
          {GRUNDERWERBSTEUER_LIST.map((g) => (
            <MenuItem
              key={g.rank}
              text={`${g.rank}. ${g.title}`}
              label={`${Number(g.makler).toFixed(2)}%`}
              onClick={(e) => onChangeMakler(e, g.rank)}
            />
          ))}
        </Menu>
      }
      disabled={false}
      placement="bottom-end"
    >
      <Button disabled={false} minimal={true} rightIcon="caret-down">
        {`${selectedMakler?.title}`}
      </Button>
    </Popover>
  );

  const renderCollapsed = () => {
    return (
      <div className="details-control-group">
        <FormGroup
          className="details-form-group"
          label="Grunderwerbsteuer, "
          labelInfo="(required)"
          inline={false}
        >
          <InputGroup
            disabled={false}
            readOnly={true}
            rightElement={grunderwerbsteuerMenu}
            value={`${Number(selectedGrunderwerbsteuer.rate).toFixed(1)}%`}
          />
        </FormGroup>
        <FormGroup
          className="details-form-group"
          label="Notarkosten"
          labelInfo={`${(props.amount * Number(props.notaryFees)) / 100.0}€`}
        >
          <NumericInput
            onValueChange={handleNotaryFeesChange}
            min={0}
            stepSize={0.1}
            fill={true}
            value={props.notaryFees}
          />
        </FormGroup>
        <FormGroup
          className="details-form-group"
          label="Grundbucheintrag, "
          labelFor="text-input"
          labelInfo={`${(props.amount * Number(props.landEntry)) / 100.0}€`}
        >
          <NumericInput
            onValueChange={handleLandEntryChange}
            min={0}
            stepSize={0.1}
            fill={true}
            value={props.landEntry}
          />
        </FormGroup>
        <FormGroup
          className="details-form-group"
          label="Maklerprovision, "
          labelInfo={`${
            (props.amount * Number(selectedMakler.makler)) / 100.0
          }€`}
          inline={false}
        >
          <InputGroup
            disabled={false}
            readOnly={true}
            rightElement={maklerProvisionMenu}
            value={`${Number(selectedMakler.makler).toFixed(2)}%`}
          />
        </FormGroup>
      </div>
    );
  };

  const getSectionTitle = () => {
    return `Nettodarlehen: ${props.overall.toFixed(0)}€, Über: ${(
      props.overall - props.amount
    ).toFixed(0)}€, Kaufnebenkosten: ${(
      (props.amount *
        (props.landEntry +
          props.landRegister +
          props.notaryFees +
          props.maklerProvision)) /
      100.0
    ).toFixed(0)}€`;
  };

  return (
    <Section collapsible={true} title={getSectionTitle()} icon="list-detail-view"> 
      <Card interactive={false}>{renderCollapsed()}</Card>
    </Section>
  );
};

export default DetailsData;
 