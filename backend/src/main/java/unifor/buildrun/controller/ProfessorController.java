package unifor.buildrun.controller;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import unifor.buildrun.entity.ProfessorEntity;
import unifor.buildrun.service.ProfessorService;

import java.util.UUID;

@Path("/professor")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService){
        this.professorService = professorService;
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("pageSize") @DefaultValue("10") Integer pageSize){

        var professores = professorService.findAll(page, pageSize);

        return Response.ok(professores).build();
    }

    @POST
    @Transactional
    public Response createProfessor(ProfessorEntity professorEntity){
        return Response.ok(professorService.createProfessor(professorEntity)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateProfessor(@PathParam("id") UUID professorId, ProfessorEntity professorEntity){
        return Response.ok(professorService.updateProfessor(professorId, professorEntity)).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") UUID professorId){
        return Response.ok(professorService.findById(professorId)).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteById(@PathParam("id") UUID professorId){
        professorService.deleteById(professorId);
        return Response.noContent().build();
    }
}
